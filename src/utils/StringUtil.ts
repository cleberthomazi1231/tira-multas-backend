export default class StringUtil {
    static censure(word: string) {
        if(!word) return '';
        let result = word;
        const size = word.length;
        for (let i = 0; i < size; i++) {
            result = result.replace(result[i], '*');
        }
        return result;
    }
}