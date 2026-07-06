import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path;";

const WORKING_DIR = "/workspace";

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from sandbox agent",
    status: "success",
  });
});

app.get("/list-files", async (req, res) => {
  const elements = await fs.promises.readdir(WORKING_DIR);

  res.status(200).json({
    message: "Elements in working directory",
    elements,
  });
});

/**
 * @route GET /read-files
 * @desc Read the contents of all files requested in query parameters "files" and returns their content as a JSON object.
 * -eg. /read-files?files=file1.txt,/src/file2.txt
 */
app.get("/read-files", async (req, res) => {
  const files = req.query.files;

  if (!files) {
    return res.status(400).json({
      message: "No files specified in query parameters",
      status: "error",
    });
  }

  const fileList = files.split(",");

  const fileContents = {};

  await Promise.all(
    fileList.map(async (file) => {
      const filePath = `${WORKING_DIR}/${file}`;
      try {
        const content = await fs.promises.readFile(filePath, "utf-8");
        return {
          [filePath]: content,
        };
      } catch (error) {
        return {
          [filePath]: `Error reading files: ${error.message}`,
        };
      }
    }),
  );
});

/**
 * @route PATCH /update-files
 * @description Updates the content of files specified in the request body. The request body should container a property 'updates' with a JSON Array of object, each object should have a 'file' property specifying the file path (relative to the working directory) and a 'content' property specifying the new content for the file.
 */
app.patch("/update-files", async (req, res) => {
  const updates = req.body.updates;

  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({
      message:
        'Invalid request body. Expected a JSON object with a "updates" property containing an array of file updates.',
      status: "error",
    });
  }

  const results = await Promise.all(
    updates.map(async (update) => {
      const { file, content } = update;
      const filePath = path.join(WORKING_DIR, file);
      try {
        await fs.promises.writeFile(filePath, content, "utf-8");
        return {
          [filePath]: "File updated successfully",
        };
      } catch (error) {
        return {
          [filePath]: `Error updating file: ${error.message}`,
        };
      }
    }),
  );

  return res.status(200).json({
    message: "File update results",
    results,
  });
});

export default app;
