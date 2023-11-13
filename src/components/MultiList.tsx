const multiValues = [1, 10, 25, 50, 100];

function MultiList({callback, multi}: {multi: number; callback: (value: number) => void}) {
    return (
        <ul className="grid grid-cols-5 gap-1 w-full">
            {multiValues.map((value, index) => {
                return (
                    <li
                        key={index}
                        className={`h-10 w-full border flex justify-center items-center cursor-pointer hover:bg-zinc-700 ${
                            multi === value ? "border-zinc-300 bg-zinc-500" : ""
                        }`}
                        onClick={() => callback(value)}>
                        x{value}
                    </li>
                );
            })}
        </ul>
    );
}

export default MultiList;
