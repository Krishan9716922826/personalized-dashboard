import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { reorderFavorites, removeFavorite } from "@/features/favorites/favoritesSlice";

const DraggableFavorites = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const reorderedIndices = [...favorites.keys()];
    const [movedIndex] = reorderedIndices.splice(source.index, 1);
    reorderedIndices.splice(destination.index, 0, movedIndex);
    dispatch(reorderFavorites(reorderedIndices));
  };

  if (favorites.length === 0) {
    return <p>No favorites yet.</p>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="favorites-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
            {favorites.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 rounded shadow bg-white dark:bg-gray-800 border transition ${
                      snapshot.isDragging ? "bg-blue-50 dark:bg-gray-700" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h2 className="font-semibold text-lg">{item.title}</h2>
                        {item.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            className="text-blue-500 text-sm underline block mt-1"
                          >
                            Read More
                          </a>
                        )}
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="mt-2 w-32 rounded"
                          />
                        )}
                      </div>
                      <button
                        onClick={() => dispatch(removeFavorite(item.id))}
                        className="text-red-500 hover:text-red-700 text-xl font-bold ml-4"
                        title="Remove"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableFavorites;
