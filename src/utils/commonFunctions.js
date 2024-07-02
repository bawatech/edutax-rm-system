export const toNull = (input) => {
    if (input == undefined) {
        return null;
    } else if (input == null) {
        return null;
    } else if (input == "") {
        return null;
    } else {
        return input;
    }
}
