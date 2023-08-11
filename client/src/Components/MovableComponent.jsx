import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles.css";
import { useDispatch } from "react-redux";
import { SYNC_CATEGORIZE_STATE } from "../store/reducers/respondSlice";

const CATEGORIES = "CATEGORIES"


const MovableItem = ({
    name,
    index,
    currentColumnName,
    moveCardHandler,
    setItems
}) => {
    const changeItemColumn = (currentItem, columnName) => {
        setItems((prevState) => {
            // check if the column we want to move the item to, does it already have a member?
            // Ignore this condition if we want to move it to the CATEGORIES column

            const columns = prevState.map(e => e.column)
            if (columnName != CATEGORIES && columns.includes(columnName)) return prevState

            return prevState.map((e) => {
                return {
                    ...e,
                    column: e.name === currentItem.name ? columnName : e.column
                };
            });
        });
    };

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "Our first type",
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCardHandler(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        item: { index, name, currentColumnName },
        type: "Our first type",
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();

            if (dropResult) {
                const { name } = dropResult;
                changeItemColumn(item, name)

            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0.4 : 1;

    drag(drop(ref));

    return (
        <div ref={ref} className="movable-item" style={{ opacity }}>
            {name}
        </div>
    );
};

const Column = ({ children, className, title }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "Our first type",
        drop: () => ({ name: title }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        // Override monitor.canDrop() function
        canDrop: (item) => {
            const { currentColumnName } = item;
            return (
                true
            );
        }
    });

    const getBackgroundColor = () => {
        if (isOver) {
            if (canDrop) {
                return "rgb(188,251,255)";
            } else if (!canDrop) {
                return "rgb(255,188,188)";
            }
        } else {
            return "";
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: 10 }}>
            <div style={{ textAlign: 'center' }}>{title}</div>
            <div
                ref={drop}
                className={className}
                style={{ backgroundColor: getBackgroundColor() }}
            >
                {children}
            </div>
        </div>
    );
};
/**
 * All rights belong to their respective owner.
 * Source - https://codesandbox.io/s/eager-wright-cfzr3g
 */
export const MovableComponent = ({ tasks, myItems }) => {
    const dispatch = useDispatch();

    const [items, setItems] = useState(tasks);

    useEffect(() => {
        dispatch(SYNC_CATEGORIZE_STATE(items))
    }, [items])

    const moveCardHandler = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];

        if (dragItem) {
            setItems((prevState) => {
                const coppiedStateArray = [...prevState];

                // remove item by "hoverIndex" and put "dragItem" instead
                const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

                // remove item by "dragIndex" and put "prevItem" instead
                coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

                return coppiedStateArray;
            });
        }
    };

    const returnItemsForColumn = (columnName) => {
        return items
            .filter((item) => item.column === columnName)
            .map((item, index) => (
                <MovableItem
                    key={item.id}
                    name={item.name}
                    currentColumnName={item.column}
                    setItems={setItems}
                    index={index}
                    moveCardHandler={moveCardHandler}
                />
            ));
    };

    const finish = () => {
        const mappings = items.filter(({ column }) => column != CATEGORIES).map(({ column, name }) => ({ item: column, belongsTo: name }))
    }

    return (
        <div >
            <DndProvider backend={HTML5Backend}>
                <div className="container">

                    <Column title={CATEGORIES} className="base categories-row">
                        {returnItemsForColumn(CATEGORIES)}
                    </Column>
                </div>

                <div className="columns-wrapper" >
                    {myItems.map(i =>
                        <Column key={i} title={i} className="base column belongings-column">
                            {returnItemsForColumn(i)}
                        </Column>
                    )}
                </div>
            </DndProvider>
        </div>
    );
};
