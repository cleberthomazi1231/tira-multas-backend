import puppeteer from 'puppeteer';
import { Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../config/app';
import axios from 'axios';

const SaleController = {
    create({ buyerService, dealerService, resourceService, saleService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                const buyer = await buyerService.create(body.buyer);
                const dealer = await dealerService.findById(body.dealer_id);
                const resource = await resourceService.findById(body.resource_id);
                const sale = await saleService.create({
                    ...body,
                    buyer,
                    dealer,
                    resource,
                });
                return res.status(201).json(sale);
            } catch (error) {
                next(error);
            }
        };
    },
    find({ saleService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params ;
                const sale = await saleService.findById(id);
                return res.status(200).json(sale);
            } catch (error) { 
                next(error);
            }
        };
    },
    list({ saleService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { query } = req;
                const sales = await saleService.findAll(query as Query);
                return res.status(200).json(sales);
            } catch (error) { 
                next(error);
            }
        };
    },
    listByBuyerId({ saleService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { buyer_id } = req.params;
                const sales = await saleService.findAllByBuyerId(buyer_id);
                return res.status(200).json(sales);
            } catch (error) { 
                next(error);
            }
        };
    },

    generateHTML({ saleService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params;
                res.setHeader('content-type', 'text/html');
                const sale = await saleService.findById(id);
                if(!sale) return res.status(200).send(''); 

                let replacedDocument = sale.resource.document;

                sale.response_data.forEach((field: any) => {
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

                return res.status(200).send(replacedDocument); 
            } catch (error) { 
                next(error);
            }
        };
    },
    generateHTMLPreview({ saleService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params;
                res.setHeader('content-type', 'text/html');
                const sale = await saleService.findById(id);
                if(!sale) return res.status(200).send(''); 

                let replacedDocument = sale.resource.document;

                sale.response_data.forEach((field: any) => {
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

                return res.status(200).send(`<div style="width:100vw;display:flex;justify-content: center;">ESTE DOCUMENTO É UMA PRÉVIA, EFETUE O PAGAMENTO PARA DESBLOQUEAR A VERSÃO COMPLETA</div><br><br>${replacedDocument || ''}`); 
            } catch (error) { 
                next(error);
            }
        };
    },
    generatePDF({ saleService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params;
                const sale = await saleService.findById(id);
                if(!sale) throw new Error('sale_not_exists'); 

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(`${process.env.TIRA_MULTAS_APP_HOST}/sales/${id}.html`);

                const pdf = await page.pdf({
                    printBackground: true,
                    format: 'letter',
                    margin: {
                        top: '20px',
                        left: '20px',
                        right: '20px',
                        bottom: '100px'
                    },
                    displayHeaderFooter: true,
                    footerTemplate: `<footer style="margin: auto; width: 90%;font-size:8px;text-align:center;font-weight:300;">
                        <hr style="width:80%;height:2px;"/>
                        <p>Material produzido através da plataforma Tira Multas. Todos os direitos autorais reservados.</p>
                        <p>Reprodução não autorizada! www.tiramulta.com.br</p>
                    </footer>`,
                });

                await browser.close();
                res.setHeader('content-type', 'application/pdf');
                return res.status(200).send(pdf); 
            } catch (error) { 
                next(error);
            }
        };
    },
    generatePDFPreview({ saleService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params;
                const sale = await saleService.findById(id);
                if(!sale) throw new Error('sale_not_exists'); 

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(`${process.env.TIRA_MULTAS_APP_HOST}/sales/${id}/preview.html`);

                const pdf = await page.pdf({
                    printBackground: true,
                    format: 'letter',
                    margin: {
                        top: '20px',
                        left: '20px',
                        right: '20px',
                        bottom: '100px'
                    },
                    displayHeaderFooter: true,
                    footerTemplate: `<footer style="margin: auto; width: 90%;font-size:8px;text-align:center;font-weight:300;">
                        <hr style="width:80%;height:2px;"/>
                        <p>Material produzido através da plataforma Tira Multas. Todos os direitos autorais reservados.</p>
                        <p>Reprodução não autorizada! www.tiramulta.com.br</p>
                    </footer>`,
                    pageRanges: '1'
                });

                await browser.close();
                res.setHeader('content-type', 'application/pdf');
                return res.status(200).send(pdf); 
            } catch (error) { 
                next(error);
            }
        };
    },
    buy({ buyerService, dealerService, resourceService, saleService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                const buyer = await buyerService.findById(body.buyer_id);
                const dealer = await dealerService.findById(body.dealer_id);
                const resource = await resourceService.findById(body.resource_id);
                const { payment_data, resource_data,...data } = body;
            
                const sale = await saleService.buy({
                    ...data,
                    buyer,
                    dealer,
                    resource,
                }, resource_data, payment_data);
                return res.status(200).json(sale);
            } catch (error) {
                next(error);
            }
        };
    },
    updateStatusMercadoPago({ saleService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
                const { data } = req.body;

                axios.get(`https://api.mercadopago.com/v1/payments/${data.id}`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.MERCHANT_KEY_MP}`
                    }
                }).then(async (response) => {
                    const { status, data: mpResponse } = response;
                    if(status === 200) {
                        if(mpResponse.status === 'approved') {
                            await saleService.updateStatus(id, 'APPROVED');
                        }
                    }
                }).catch((e) => console.error(e));
                return res.status(200).json();
            } catch (error) {
                next(error);
            }
        };
    }
};

export default SaleController;