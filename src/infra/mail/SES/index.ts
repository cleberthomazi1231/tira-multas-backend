import SES from 'aws-sdk/clients/ses';

export interface IMessage {
  from: {
    name: string;
    email: string;
  };
  to: string;
  subject: string;
  body: string;
}

class SESMailProvider {
    private client: SES;

    constructor() {
        this.client = new SES({
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.TIRA_MULTAS_AWS_ACCESS_KEY as string,
                secretAccessKey: process.env.TIRA_MULTAS_AWS_SECRET_ACCESS_KEY as string
            }
        });
    }

    async sendEmail(message: IMessage): Promise<void> {
        await this.client
            .sendEmail({
                Source: `${message.from.name} <contato@wsuite.com.br>`,
                Destination: {
                    ToAddresses: [message.to]
                },
                Message: {
                    Subject: {
                        Data: message.subject
                    },
                    Body: {
                        Html: {
                            Data: message.body
                        }
                    }
                },
                Tags: [
                    {
                        Name: 'identificator',
                        Value: message.to.replace('@', '').replace(/\./g, '')
                    }
                ],
                ConfigurationSetName: 'w2Mail'
            })
            .promise();
    }
}

export default new SESMailProvider();  