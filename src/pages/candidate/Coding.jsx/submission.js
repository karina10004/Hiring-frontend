import axios from "axios";

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const headers = {
  "x-rapidapi-key": "a153a9a044mshceeb2d2e39060a2p151ab3jsn4eb3661acc00",
  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  "Content-Type": "application/json",
};

export const runCodeOnJudge0 = async (code, language, testCases, maxScore) => {
  try {
    let score = 0;
    let testCasesPassed = 0;
    const visibleTestCases = testCases.filter((testCase) => !testCase.isHidden);

    const results = await Promise.all(
      visibleTestCases.map(async (testCase) => {
        const response = await axios.post(
          `${JUDGE0_API_URL}/submissions`,
          {
            source_code: code,
            language_id: language,
            stdin: testCase.input,
            expected_output: testCase.expectedOutput,
          },
          {
            params: {
              base64_encoded: false,
              wait: true,
              fields: "*",
            },
            headers,
          }
        );

        console.log(`Test Case ${testCase.input}:`, response.data);
        const { stdout, status, compile_output } = response.data;
        if (status.id === 3) {
          score += (testCase.weightage * maxScore) / 100;
          testCasesPassed += 1;
        }
        return { stdout, status, compile_output, id: testCase._id };
      })
    );
    return { results, score, testCasesPassed };
  } catch (error) {
    console.error("Error running code on Judge0:", error);
    throw error;
  }
};
export const submitCodeToJudge0 = async (
  code,
  language,
  testCases,
  maxScore
) => {
  try {
    let score = 0;
    let testCasesPassed = 0;

    const results = await Promise.all(
      testCases.map(async (testCase) => {
        const response = await axios.post(
          `${JUDGE0_API_URL}/submissions`,
          {
            source_code: code,
            language_id: language,
            stdin: testCase.input,
            expected_output: testCase.expectedOutput,
          },
          {
            params: {
              base64_encoded: false,
              wait: true,
              fields: "*",
            },
            headers,
          }
        );

        console.log(`Test Case ${testCase.input}:`, response.data);
        const { stdout, status, compile_output } = response.data;
        if (status.id === 3) {
          score += (testCase.weightage * maxScore) / 100;
          testCasesPassed += 1;
        }
        return { stdout, status, compile_output, id: testCase._id };
      })
    );
    return { results, score, testCasesPassed };
  } catch (error) {
    console.error("Error submitting code to Judge0:", error);
    throw error;
  }
};
