export const mapColumnOrder = (response) => {
    if(response.data.length === 0) {
        return []
    }
    return response.data.map(item => `${item.id}`) // [ '3', '1', '2' ]
}