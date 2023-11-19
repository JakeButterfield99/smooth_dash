export interface TaskProps {
    done: boolean,
    text: string,
    onCheck: Function,
}

const SaveList = (list: TaskProps[]) => {
    localStorage.setItem("todo", JSON.stringify(list));
}

const LoadList = () => {
    const list = localStorage.getItem("todo") || "[]";

    try {
        return JSON.parse(list);
    }
    catch (error: any) {
        return [];
    }
}

export default {
    SaveList,
    LoadList,
}