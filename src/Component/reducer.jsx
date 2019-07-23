const INITIAL_STATE = {
    data: {},
}
export default function insert(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'PwaPageData':
            const obj1 = Object.assign({}, state, { data: action.PwaPageData });
            return obj1;

        default:
            return state;
    }
}