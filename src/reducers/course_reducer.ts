import { Tcourse } from "../interface/Tcourse"

export type State = {
    courses: {
        data: Tcourse[]
    }
    course?: Tcourse
    pagination: {
        currentPage: number;
        pageSize: number;
        total: number;
    }
}

export type Action = 
    | {type: "GET_ALL_COURSES", payload: {data: Tcourse[], meta: {current_page: number, per_page: number, total: number}}}
    | {type: "DELETE_COURSE", payload: number}
    | {type: "CREATE_COURSE", payload: Tcourse}
    | {type: "UPDATE_COURSE", payload: Tcourse}
    | {type: "SEARCH_COURSE", payload: Tcourse[]}
    | {type: "PURCHASED_COURSE", payload: Tcourse[]}

const course_reducer = (state: State, action: Action): State => {
    switch(action.type){
        case "GET_ALL_COURSES":
            return {
                ...state,
                courses: {data: action.payload.data},
                pagination: {
                    currentPage: action.payload.meta.current_page,
                    pageSize: action.payload.meta.per_page,
                    total: action.payload.meta.total
                }
            }

        case "DELETE_COURSE":
            return {
                ...state,
                courses: {
                    data: state.courses.data.filter((item) => item.id !== action.payload)
                } 
            }

        case "CREATE_COURSE":
            return {
                ...state,
                courses: {
                    data: [...state.courses.data, action.payload]
                }
            }

            case "UPDATE_COURSE":
                return {
                    ...state,
                    courses: {
                        data: state.courses.data.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item)
                    }
                }

            case "SEARCH_COURSE":
                return {
                    ...state,
                    courses: {
                        data: action.payload
                        // data: state.courses.data.filter(course => {
                        //     // Kiểm tra nếu course.title tồn tại và là chuỗi
                        //     if (typeof course.title === 'string' && typeof action.payload === 'string') {
                        //         return course.title.toLowerCase().includes(action.payload.toLowerCase());
                        //     }
                        //     return false; // Bỏ qua các phần tử không có title hoặc payload không phải chuỗi
                        // }),
                    },
                }
            
            case "PURCHASED_COURSE": 
                return {
                    ...state,
                    courses: {
                        data: action.payload
                    }
                }

        default:
            return state
    }
}

export default course_reducer