

function CompilationErrorTestcase({compileOutput}){


    return(
         <div>

            <h3 className="text-red-400 font-semibold mb-3">

            Compilation Error

            </h3>

            <pre
            className="
            bg-slate-950
            rounded-lg
            p-4
            text-red-300
            overflow-x-auto
            whitespace-pre-wrap
            "
            >

            {compileOutput}

            </pre>

            </div>
    )
}
export default CompilationErrorTestcase;