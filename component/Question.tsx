"use client";
import React, { useState } from "react";
import {
  useCreateQuestionAndOptionsMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation,
} from "@/services/authService";
import { message, Modal, Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Question = () => {
  const { data: questions, isLoading } = useGetQuestionsQuery({});
  const [newQuestion, setNewQuestion] = useState("");
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [createQuestionAndOptions, { isLoading: isCreating }] =
    useCreateQuestionAndOptionsMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [update] = useUpdateQuestionMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [questionId, setquestionId] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState("");

  const handleAddOption = () => {
    if (
      options.length < 5 &&
      newOption.trim() !== "" &&
      !options.includes(newOption)
    ) {
      setOptions([...options, newOption]);
      setNewOption(""); // Clear input after adding option
    }
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleCreateQuestionAndOptions = () => {
    if (options.length >= 3 && options.length <= 5) {
      createQuestionAndOptions({ question: newQuestion, options })
        .unwrap()
        .then(() => {
          message.success("Question created!");
          setOptions([]);
          setNewOption("");
          setNewQuestion("");
        })
        .catch((error) => {
          message.error(error || "error creating question");
        });
    }
  };

  const handleModal = (questionId: any) => {
    setquestionId(questionId);
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuestion(questionId).unwrap();
      message.success("Question deleted successfully");
    } catch (error) {
      message.error("Failed to delete question");
    }
    setModalVisible(false);
  };

  const handleUpdateQuestion = () => {
    if (newQuestion.trim() !== "") {
      const oldOptions = questions[editingQuestionId]?.options || [];
      update({
        question: newQuestion,
        questionId: editingQuestionId,
        options: oldOptions,
      })
        .unwrap()
        .then(() => {
          message.success("Question updated successfully");
          setEditingQuestionId("");
          setNewQuestion("")
        })
        .catch((error) => {
          message.error(error?.message || "Error updating question");
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">
          Kindly create a question and its options:
        </h3>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-2"
          placeholder="Enter question"
        />
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-2 "
          placeholder="Enter option"
        />
        <button
          onClick={handleAddOption}
          disabled={options.length >= 5 || newOption.trim() === ""}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Option
        </button>
        <div className="mt-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="mr-2 capitalize">{option}</span>
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-red-500 hover:text-red-700 font-bold text-xl"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleCreateQuestionAndOptions}
          disabled={
            isCreating ||
            options.length < 3 ||
            options.length > 5 ||
            !newQuestion.trim()
          }
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            isCreating ||
            options.length < 3 ||
            options.length > 5 ||
            !newQuestion.trim()
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          {isCreating ? "Creating..." : "Create Question and Options"}
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Questions</h2>

        {isLoading ? (
          <Spin />
        ) : (
          questions &&
          Object.keys(questions)
            .reverse()
            .map((questionId) => {
              const { question, options } = questions[questionId];
              return (
                <div
                  key={questionId}
                  className="mb-4 flex justify-between items-center"
                >
                  <div className="flex space-y-3 items-center flex-col">
                    {editingQuestionId ? (
                      <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-2"
                      />
                    ) : (
                      <p className="font-semibold capitalize">{question}</p>
                    )}
                    <ul className="list-disc ml-4  space-y-2">
                      {options?.map((option: string, index: any) => (
                        <li key={index} className="capitalize">
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-3 items-center">
                    {editingQuestionId ? (
                      <button
                        onClick={handleUpdateQuestion}
                        className="bg-green-200 p-2 rounded-md"
                      >
                        Finish Edit
                      </button>
                    ) : (
                      <EditOutlined
                        onClick={() => setEditingQuestionId(questionId)}
                        style={{ marginRight: "10px", cursor: "pointer" }}
                      />
                    )}

                    <DeleteOutlined
                      onClick={() => handleModal(questionId)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              );
            })
        )}
      </div>
      <Modal
        width="250px"
        centered={true}
        title="Confirmation"
        open={modalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this question?</p>
      </Modal>
    </div>
  );
};

export default Question;
