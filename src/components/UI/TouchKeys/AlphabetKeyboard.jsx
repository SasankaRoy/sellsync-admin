import { ChevronLeft, ChevronRight, Delete, Space } from 'lucide-react';
import React from 'react';

function AlphabetKeyboard({ setShowPassFeild, showPassFeild, setCurrentSelection, setLoginInfo, loginHandler }) {
    const rows = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', <Delete title='Delete' />],
        [<Space title='Space' />, '@', '$', '.', '-', <ChevronLeft title='Back' />, <ChevronRight title='Go' />]
    ];

    const handleKeyClick = (key) => {
        if (key?.props?.title === 'Go') {
            if (showPassFeild) {
                loginHandler();
                console.log('loginHandler in called')
            } else {
                setShowPassFeild(true)
            }
            return;
        } else if (key?.props?.title === 'Back') {
            if (!showPassFeild) {
                setCurrentSelection('')
            }
            setShowPassFeild(false)
            return;
        } else if (key?.props?.title === 'Space') {
            if (showPassFeild) {
                setLoginInfo((pre) => { return { ...pre, password: pre.password + ' ' } })
            } else {
                setLoginInfo((pre) => { return { ...pre, userId: pre.userId + ' ' } })
            }
            return
        }
        else if (key?.props?.title === 'Delete') {
            if (showPassFeild) {
                setLoginInfo((pre) => { return { ...pre, password: pre.password.slice(0, -1) } })
            } else {
                setLoginInfo((pre) => { return { ...pre, userId: pre.userId.slice(0, -1) } })
            }
            return;
        }

        if (showPassFeild) {
            setLoginInfo((pre) => { return { ...pre, password: pre.password + key } })
        } else {
            setLoginInfo((pre) => { return { ...pre, userId: pre.userId + key } })
        }




    };

    return (
        <div className="flex flex-col items-center p-4  rounded-lg">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center mb-2 w-full">
                    {row.map((key) => (
                        <button
                            key={key?.props?.title ? key.props.title : key}
                            onClick={() => handleKeyClick(key)}
                            className={`  w-[4dvw] h-[4dvw] m-1 rounded-full customShadow text-white flex items-center justify-center text-xl font-bold shadow-md hover:bg-gray-700/70 transition-colors cursor-pointer  uppercase`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default AlphabetKeyboard;