import mercadopago from 'mercadopago';
import { BadRequestError } from '../app/errors';
import Sale, { SaleProps } from '../domain/Sale';
import SaleRepository from '../infra/database/knex/repositories/SaleRepository';
import { getCardBrand } from '../utils/Creditcard';

export default class SaleService {
    private saleRepository: SaleRepository;

    constructor(){ 
        this.saleRepository = new SaleRepository();
    }

    async create (data: SaleProps){
        const document = `<div style="width:100vh;display:flex;justify-content:center;"><img src="${process.env.TIRA_MULTAS_APP_HOST}/files/logo.png" style="width:200px;height:100px;"></div></br>`;

        const sale = Sale.create({
            ...data,
            document,
        });
        return this.saleRepository.save(sale);
    }

    async update(id: string, data: any){
        const sale = await this.findById(id);
        const updateSale = Sale.create({ ...sale, ...data });
        return this.saleRepository.update(updateSale);
    }

    async updateStatus(id: string, status: string) {
        return this.saleRepository.updateStatus(id, status);
    }

    async delete(id: string){
        return this.saleRepository.delete(id); 
    }

    async findById(id: string){
        const sale = await this.saleRepository.findById(id);
        if(!sale) throw new BadRequestError([{
            field: 'id', message: 'sale_not_exists'
        }]);
        return sale;
    }

    async findAll(query: Query){
        const sales = await this.saleRepository.findAll(query);
        return sales;
    }

    async findAllByBuyerId(buyerId: string){
        const sales = await this.saleRepository.findAllByBuyerId(buyerId);
        return sales;
    }

    async buy(data: SaleProps, resourceData: any, paymentData: any){
        try {
            let replacedDocument = `<div style="width:100vh;display:flex;justify-content:center;"><img src="${process.env.TIRA_MULTAS_APP_HOST}/files/logo.png" style="width:200px;height:100px;"></div></br>`;
            replacedDocument += data.resource.document;

            resourceData.forEach((field: any) => {
                if(field.flag.includes('CODIGO_ARTIGO') || field.flag.includes('CODIGO_FICHA')) {
                    replacedDocument = replacedDocument.replace(field.flag, field.options[0].value);
                } else {
                    let response = '';
                    if(field.type === 'TEXT')
                        response = field.response;
                    else if(field.type === 'SELECT') 
                        response = field.options.find((option: any) => String(option.value).toUpperCase() === String(field.response).toUpperCase())?.anexo || '';
                    else if(field.type === 'MULTISELECT') 
                        response = field.response;
                    else if(field?.photo) 
                        response = `<img src="${field.photo}" style="width:160px;height:160px;"></br>`;

                    replacedDocument = replacedDocument.replaceAll(field.flag, `${response}`);
                }
            });

            const document = replacedDocument;

            let sale = Sale.create({...data, document, response_data: resourceData, status: 'PENDING'});
            if(paymentData.type === 'CREDITCARD') {
                mercadopago.configure({
                    sandbox: false,
                    access_token: process.env.TIRA_MULTAS_MERCHANT_KEY_MP as string
                });
            
                const payment_data = {
                    transaction_amount: Number(parseFloat(String(sale.total_value)).toFixed(2)),
                    token: paymentData.token,
                    statement_descriptor: 'TiraMulta',
                    installments: 1,
                    payment_method_id: getCardBrand(paymentData.card_number),
                    payer: {
                        email: sale.buyer.email
                    }
                };
            
                const response = await mercadopago.payment.save(payment_data);
                if (response.body.status === 'approved') {
                    sale = Sale.create({...data, status: 'APPROVED' });
                } else {
                    sale = Sale.create({...data, status: 'DENIED' });
                }
            }
            return this.saleRepository.save(sale);
        } catch (e: any) {
            console.error(e?.stack);
            console.error(e?.message);
        }
    }
}