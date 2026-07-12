import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

      const problemSchema = z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),

        difficulty: z.enum(["easy", "medium", "hard"]),

        tags: z.enum([
          "array",
          "linkedList",
          "graph",
          "dp",
        ]),
        score:z.string()
        .min(1, "Score must be greater than 0"),

        visibleTestCases: z
          .array(
            z.object({
              input: z.string().min(1, "Input is required"),
              output: z.string().min(1, "Output is required"),
              explanation: z
                .string()
                .min(1, "Explanation is required"),
            })
          )
          .min(1, "At least one visible test case required"),

        hiddenTestCases: z
          .array(
            z.object({
              input: z.string().min(1, "Input is required"),
              output: z.string().min(1, "Output is required"),
            })
          )
          .min(1, "At least one hidden test case required"),

        startCode: z
          .array(
            z.object({
              language: z.enum([
                "c++",
                "java",
                "javascript",
              ]),
              initialCode: z
                .string()
                .min(1, "Initial code is required"),
            })
          )
          .length(3),

        referenceSolution: z
          .array(
            z.object({
              language: z.enum([
                "c++",
                "java",
                "javascript",
              ]),
              completeCode: z
                .string()
                .min(1, "Complete code is required"),
            })
          )
          .length(3),
      });
            
           
function UpdateProblem() {


              const navigate = useNavigate();
              const {problemId}=useParams();
              const [loading,setLoading]=useState(false);

              const {
                register,
                control,
                handleSubmit,
                formState: { errors },
              } = useForm({
                resolver: zodResolver(problemSchema),

                defaultValues: {
                  visibleTestCases: [
                    {
                      input: "",
                      output: "",
                      explanation: "",
                    },
                  ],

                  hiddenTestCases: [
                    {
                      input: "",
                      output: "",
                    },
                  ],

                  startCode: [
                    {
                      language: "c++",
                      initialCode: "",
                    },
                    {
                      language: "java",
                      initialCode: "",
                    },
                    {
                      language: "javascript",
                      initialCode: "",
                    },
                  ],

                  referenceSolution: [
                    {
                      language: "c++",
                      completeCode: "",
                    },
                    {
                      language: "java",
                      completeCode: "",
                    },
                    {
                      language: "javascript",
                      completeCode: "",
                    },
                  ],
                },
              });

                const {
                  fields: visibleFields,
                  append: appendVisible,
                  remove: removeVisible,
                } = useFieldArray({
                  control,
                  name: "visibleTestCases",
                });

                const {
                  fields: hiddenFields,
                  append: appendHidden,
                  remove: removeHidden,
                } = useFieldArray({
                  control,
                  name: "hiddenTestCases",
                });

              const onSubmit = async (data) => {
                try {
                    setLoading(true);
                  await axiosClient.put(
                    `/problem/update/${problemId}`,
                    data
                  );

                  alert(
                    "Problem updated successfully!"
                  );

                  // navigate("/");
                } catch (error) {
                  alert(
                    error.response?.data?.message ||
                      "Error updating problem"
                  );
                } finally{
                    setLoading(false);
                }
              };

             return (
                <>
                {loading ? (
                    <div className="fixed inset-0 z-50 bg-[#0b1120]/90 backdrop-blur-md flex items-center justify-center">
                        <div className="flex flex-col items-center">

                        {/* Spinner */}
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 rounded-full border-4 border-blue-900/40"></div>

                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500 animate-spin"></div>

                            <div className="absolute inset-4 rounded-full bg-[#111827] flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-2xl">⚡</span>
                            </div>
                        </div>

                        <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-white text-center">
                            Updating Problem
                        </h2>

                        <p className="mt-2 text-sm sm:text-base text-slate-400 text-center px-4">
                            Validating test cases with Judge0...
                        </p>

                        <div className="mt-6 flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                            <span
                            className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                            ></span>
                            <span
                            className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                            ></span>
                        </div>

                        </div>
                    </div>
                    )

                    
                  : (
                    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      
                        <h1 className="text-3xl sm:text-4xl font-bold">
                          Update Problem
                        </h1>

                        <Link to="/">
                            <button className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">Return to Home</button>
                            </Link>
                      </div>
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">

                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-8"
                        >

                          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl">

                            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                              Basic Information
                            </h2>

                            <div className="space-y-5">

                              <div>
                                <label className="block mb-2 text-slate-300">
                                 New Title
                                </label>

                                <input
                                  {...register("title")}
                                  className="w-full px-4 py-3 text-sm sm:text-base rounded-xl bg-slate-800 border border-slate-700"
                                />

                                {errors?.title && (
                                  <p className="text-red-400 text-xs sm:text-sm mt-2">
                                    {errors?.title?.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block mb-2 text-slate-300">
                                  New Description
                                </label>

                                <textarea
                                  rows={6}
                                  {...register("description")}
                                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 resize-none"
                                />

                                {errors?.description && (
                                  <p className="text-red-400 text-xs sm:text-sm mt-2">
                                    {
                                      errors?.description
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>
                              <div>
                              <label className="block mb-2 text-slate-300">
                                 New Score
                                  </label>
                  
                                <input
                                  type="number"
                                  {...register("score")}
                                  className="w-full px-4 py-3 text-sm sm:text-base rounded-xl bg-slate-800 border border-slate-700"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block mb-2 text-slate-300">
                                      New Difficulty
                                    </label>
                                <select
                                  {...register("difficulty")}
                                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
                                >
                                  <option value="easy">
                                    Easy
                                  </option>
                                  <option value="medium">
                                    Medium
                                  </option>
                                  <option value="hard">
                                    Hard
                                  </option>
                                </select>
                                </div>
                                <div>
                              <label className="block mb-2 text-slate-300">
                                             New Tag
                              </label>
                                <select
                                  {...register("tags")}
                                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
                                >
                                  <option value="array">
                                    Array
                                  </option>

                                  <option value="linkedList">
                                    Linked List
                                  </option>

                                  <option value="graph">
                                    Graph
                                  </option>

                                  <option value="dp">
                                    DP
                                  </option>
                                </select>
                                </div>

                              </div>
                            </div>
                          </div>

                          {/* Test Cases */}
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">

                    <h2 className="text-2xl font-semibold mb-6">
                     New Test Cases
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-6">

                      {/* Visible Test Cases */}
                      <div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-between sm:items-center mb-4">
                          <h3 className="text-lg font-medium">
                           New Visible Test Cases
                          </h3>

                          <button
                            type="button"
                            onClick={() =>
                              appendVisible({
                                input: "",
                                output: "",
                                explanation: "",
                              })
                            }
                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                          >
                            Add New Cases
                          </button>
                        </div>

                        <div className="space-y-4">

                          {visibleFields?.map((field, index) => (
                            <div
                              key={field.id}
                              className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                            >

                              <div className="flex justify-center sm:justify-end mb-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeVisible(index)
                                  }
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                                >
                                  Remove
                                </button>
                              </div>

                              <div className="space-y-3">

                                <input
                                  {...register(
                                    `visibleTestCases.${index}.input`
                                  )}
                                  placeholder="Input"
                                  className="w-full px-4 py-3 text-sm sm:text-base rounded-xl bg-slate-900 border border-slate-700"
                                />

                                <input
                                  {...register(
                                    `visibleTestCases.${index}.output`
                                  )}
                                  placeholder="Output"
                                  className="w-full px-4 py-3 text-sm sm:text-base rounded-xl bg-slate-900 border border-slate-700"
                                />

                                <textarea
                                  rows={4}
                                  {...register(
                                    `visibleTestCases.${index}.explanation`
                                  )}
                                  placeholder="Explanation"
                                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 resize-none outline-none"
                                />

                              </div>
                            </div>
                          ))}

                        </div>
                      </div>

                      {/* Hidden Test Cases */}
                      <div>

                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">
                           New Hidden Test Cases
                          </h3>

                          <button
                            type="button"
                            onClick={() =>
                              appendHidden({
                                input: "",
                                output: "",
                              })
                            }
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                          >
                            Add New Case
                          </button>
                        </div>

                        <div className="space-y-4">

                          {hiddenFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                            >

                              <div className="flex justify-end mb-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeHidden(index)
                                  }
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                                >
                                  Remove
                                </button>
                              </div>

                              <div className="space-y-3">

                                <input
                                  {...register(
                                    `hiddenTestCases.${index}.input`
                                  )}
                                  placeholder="Input"
                                  className="w-full px-4 py-3 text-sm sm:text-base rounded-xl bg-slate-900 border border-slate-700"
                                />

                                <input
                                  {...register(
                                    `hiddenTestCases.${index}.output`
                                  )}
                                  placeholder="Output"
                                  className="w-full px-4 py-3 text-sm sm:text-base rounded-xl bg-slate-900 border border-slate-700"
                                />

                              </div>

                            </div>
                          ))}

                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Code Templates */}
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">

                    <h2 className="text-2xl font-semibold mb-6">
                      New Code Templates
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className="bg-slate-800 border border-slate-700 rounded-xl p-4 sm:p-5"
                        >
                          <h3 className="text-lg font-semibold text-blue-400 mb-4">
                            {index === 0
                              ? "c++"
                              : index === 1
                              ? "java"
                              : "javascript"}
                          </h3>

                          <div className="space-y-5">

                            {/* Initial Code */}
                            <div>
                              <label className="block mb-2 text-slate-300">
                               New Initial Code
                              </label>

                              <div className="bg-slate-950 border border-slate-700 rounded-xl p-3 sm:p-4 overflow-x-auto">
                                <textarea
                                  {...register(
                                    `startCode.${index}.initialCode`
                                  )}
                                  rows={10}
                                  className="w-full bg-transparent outline-none font-mono text-xs sm:text-sm resize-none"
                                />
                              </div>

                              {errors.startCode?.[index]
                                ?.initialCode && (
                                <p className="text-red-400 text-xs sm:text-sm mt-2">
                                  {
                                    errors.startCode[index]
                                      .initialCode.message
                                  }
                                </p>
                              )}
                            </div>

                            {/* Reference Solution */}
                            <div>
                              <label className="block mb-2 text-slate-300">
                               New Reference Solution
                              </label>

                              <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
                                <textarea
                                  {...register(
                                    `referenceSolution.${index}.completeCode`
                                  )}
                                  rows={10}
                                  className="w-full bg-transparent outline-none font-mono text-sm resize-none"
                                />
                              </div>

                              {errors.referenceSolution?.[
                                index
                              ]?.completeCode && (
                                <p className="text-red-400 text-xs sm:text-sm mt-2">
                                  {
                                    errors
                                      .referenceSolution[index]
                                      .completeCode.message
                                  }
                                </p>
                              )}
                            </div>

                          </div>
                        </div>
                      ))}

                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                  disabled={loading}
                    type="submit"
                    className="
                      w-full
                      py-3
                      sm:py-4
                      rounded-2xl
                      bg-indigo-600
                      cursor-pointer
                      hover:bg-indigo-700
                      transition-all
                      duration-300
                      text-base sm:text-lg
                      font-semibold
                      shadow-lg
                      disabled:bg-blue-400
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading ? "Updating Problem...":"Update Problem"}
                  </button>

                        </form>
                      </div>
                    </div>
                    )
                    }
            </>
);
}

export default UpdateProblem;

