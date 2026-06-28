

function RuntimeErrorTestcase({runtimeOutput}){



    return (
   
             <div>

                <h3 className="text-red-400 font-semibold mb-3">

                Runtime Error

                </h3>

                <pre
                className="bg-slate-950 rounded-lg p-4 text-red-300 overflow-x-auto whitespace-pre-wrap"
                >

                {runtimeOutput}

                </pre>

                </div>
    )
}
export default RuntimeErrorTestcase;