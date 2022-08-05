import React from "react"
import { ITasksContent } from "../../models/ITasksContent"

const TasksContent: React.FC<ITasksContent> = ({ task }) => {
    const [editMode, setEditMod] = React.useState(false)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const focusOnElement = () => {
        setEditMod(!editMode)
    }

    const moveCaretAtEnd = (e) => {
        let temp_value = e.target.value
        e.target.value = ""
        e.target.value = temp_value
    }

    const [value, setValue] = React.useState(task.content)
    const onChange = (event) => setValue(event.target.value)
    const MIN_TEXTAREA_HEIGHT = 10

    React.useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit"

            textareaRef.current.style.height = `${Math.max(
                textareaRef.current.scrollHeight,
                MIN_TEXTAREA_HEIGHT
            )}px`
        }
    })

    return (
        <>
            {editMode ? (
                <textarea
                    onChange={onChange}
                    ref={textareaRef}
                    className="block__content_input"
                    // style={{
                    //     minHeight: MIN_TEXTAREA_HEIGHT,
                    // }}
                    value={value}
                    autoFocus
                    onFocus={moveCaretAtEnd}
                    onDoubleClick={() => focusOnElement()}
                />
            ) : (
                <p className="block__content_text" onDoubleClick={() => focusOnElement()}>
                    {task.content}
                </p>
            )}
        </>
    )
}

export default TasksContent
