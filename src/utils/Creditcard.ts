import creditCardType from 'credit-card-type';

export function getCardBrand(number: string): string {
    const brand = creditCardType(number);

    if (brand[0].type === 'american-express') return 'amex';
    if (brand[0].type === 'discover') return 'discover';
    if (brand[0].type === 'elo') return 'elo';
    if (brand[0].type === 'hipercard') return 'hipercard';
    if (brand[0].type === 'jcb') return 'jcb';
    if (brand[0].type === 'visa') return 'visa';
    if (brand[0].type === 'mastercard') return 'master';
    if (brand[0].type === 'diners-club') return 'diners';
    if (brand[0].type === 'maestro') return 'master';

    return 'master';
}