// const mapColumnOrder = require("./mapColumnOrder")
import { mapColumnOrder } from './mapColumnOrder';
import { mapResponseStatus } from './mapResponseStatus';

describe(mapColumnOrder, () => {
    const data = {data: [{id: 76, name: 'To do', priority: 0}, {id: 77, name: 'In progress', priority: 1}]}
    it("desent value to columnOrder", () => {
        expect(mapColumnOrder(data)).toEqual([ '76', '77'])
    })

    it("empty value", () => {
        expect(mapColumnOrder({data: []})).toEqual([])
    })
})

describe(mapResponseStatus, () => {
    const data = [{id: '97', name: 'To do', priority: 0}]
    const result = {"97": {id: '97', name: 'To do', taskIds:[]}}
    
    it("desent value to responseStatus", () => {
        expect(mapResponseStatus(data)).toEqual(result)
    })

    it("empty value to responseStatus", () => {
        expect(mapResponseStatus([])).toEqual({})
    })
})