import UserRepository from '../infra/database/knex/repositories/UserRepository';
import SES from '../infra/mail/SES';

export default class ContactService {
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async send(data: any){
        const { name, telephone, email, message } = data;
        const admin = await this.userRepository.findBy('name', 'Admin');
        if(!admin) return;
        const messageBody = `Nome: ${name}<br>Telefone: ${telephone}<br>E-mail: ${email}<br><br>${message}`;
        await SES.sendEmail({
            to: admin.email,
            from: {
                name,
                email: ''
            },
            subject: 'Novo Contato Tira Multa',
            body: messageBody
        });
    } 
}