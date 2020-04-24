export const formatName = (name) => {
    if (name.length === 2) {
        return name.slice(0, 1) + '\xa0\xa0\xa0\xa0' + name.slice(1)
    }
    return name;
};