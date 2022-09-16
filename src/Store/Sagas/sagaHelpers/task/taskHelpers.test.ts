import { mapResponsePrevTasks } from './mapResponsePrevTasks';
import { mapResponseTasks } from './mapResponseTasks';

describe(mapResponseTasks, () => {
    const data = [{id: 133, content: 'dfsa', priority: 4, status_id: 87}]
    const result = [{"133": {"content": "dfsa", "id": "133", "isOpen": false, "priority": 4, "status_id": 87}}, {"87": ["133"]}]
    

    it("desent value to ResponseTasks", () => {
        expect(mapResponseTasks(data)).toEqual(result)
    })

    it("empty value to ResponseTasks", () => {
        expect(mapResponseTasks([])).toEqual({})
    })
})

describe(mapResponsePrevTasks, () => {
    const data = [{id: 133, content: 'dfsa', priority: 4, status_id: 87}]
    const result = {"133": {id: '133', content: 'dfsa', priority: 4}}

    it("desent value to mapResponsePrevTasks", () => {
        expect(mapResponsePrevTasks(data)).toEqual(result)
    })

    it("empty value to mapResponsePrevTasks", () => {
        expect(mapResponsePrevTasks([])).toEqual({})
    })
})