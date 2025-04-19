import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from "multer";
import FormData from "form-data";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(express.text());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// إعداد النموذج
const model = genAI.getGenerativeModel({
  model: "models/gemini-2.0-flash-thinking-exp-01-21",
  generationConfig: {
    temperature: 0.95,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
  },
});

const upload = multer({ dest: "uploads/" });

app.post("/speech-to-text", upload.single("file"), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const apiKey = "sk_2c72d7f245eb039de0857a2311c986fcc3d4e144940c2a6e";
    const apiUrl = "https://api.elevenlabs.io/v1/speech-to-text";

    const form = new FormData();
    form.append("model_id", "scribe_v1_experimental");
    form.append("file", fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        ...form.getHeaders(),
      },
      body: form as any,
    });

    const data = await response.json();

    // Clean up uploaded file
    fs.unlink(req.file.path, () => {});

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

app.post("/generate", async (req: Request, res: Response) => {
  const userInput = req.body;
  // 1. Define the contents array
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `الكلمات مع الوقت :

[
  {
    "wordsTimes": [
      {
        "text": "أي",
        "start": 20.259
      },
      {
        "text": " ",
        "start": 20.579
      },
      {
        "text": "حلم",
        "start": 20.579
      },
      {
        "text": " ",
        "start": 21.039
      },
      {
        "text": "مفجع.",
        "start": 21.379
      },
      {
        "text": " ",
        "start": 21.999
      },
      {
        "text": "تسلل",
        "start": 22.899
      },
      {
        "text": " ",
        "start": 23.519
      },
      {
        "text": "لجفنها.",
        "start": 23.619
      },
      {
        "text": " ",
        "start": 24.839
      },
      {
        "text": "تلك",
        "start": 25.76
      },
      {
        "text": " ",
        "start": 26.279
      },
      {
        "text": "المثقلة",
        "start": 26.359
      },
      {
        "text": " ",
        "start": 27.399
      },
      {
        "text": "بآلام",
        "start": 28.279
      },
      {
        "text": " ",
        "start": 29.099
      },
      {
        "text": "المرض",
        "start": 29.099
      },
      {
        "text": " ",
        "start": 30.039
      },
      {
        "text": "والفراق.",
        "start": 30.039
      },
      {
        "text": " ",
        "start": 30.959
      },
      {
        "text": "في",
        "start": 31.239
      },
      {
        "text": " ",
        "start": 31.699
      },
      {
        "text": "ليلة",
        "start": 31.719
      },
      {
        "text": " ",
        "start": 32.44
      },
      {
        "text": "دمع",
        "start": 32.559
      },
      {
        "text": " ",
        "start": 33.139
      },
      {
        "text": "جانت",
        "start": 33.459
      },
      {
        "text": " ",
        "start": 34.279
      },
      {
        "text": "ثقيلة.",
        "start": 34.319
      },
      {
        "text": " ",
        "start": 35.919
      },
      {
        "text": "فزت",
        "start": 36.719
      },
      {
        "text": " ",
        "start": 37.379
      },
      {
        "text": "من",
        "start": 37.42
      },
      {
        "text": " ",
        "start": 37.78
      },
      {
        "text": "حليم",
        "start": 37.84
      },
      {
        "text": " ",
        "start": 38.819
      },
      {
        "text": "عينى",
        "start": 38.819
      },
      {
        "text": " ",
        "start": 39.619
      },
      {
        "text": "العليلى.",
        "start": 39.619
      },
      {
        "text": " ",
        "start": 41.139
      },
      {
        "text": "لمحت",
        "start": 42.079
      },
      {
        "text": " ",
        "start": 42.799
      },
      {
        "text": "وجه",
        "start": 42.799
      },
      {
        "text": " ",
        "start": 43.479
      },
      {
        "text": "ليحسان",
        "start": 43.479
      },
      {
        "text": " ",
        "start": 44.699
      },
      {
        "text": "بمن",
        "start": 44.799
      },
      {
        "text": " ",
        "start": 45.239
      },
      {
        "text": "يتي.",
        "start": 45.239
      },
      {
        "text": " ",
        "start": 46.659
      },
      {
        "text": "رادت",
        "start": 47.399
      },
      {
        "text": " ",
        "start": 48.059
      },
      {
        "text": "ودعه",
        "start": 48.059
      },
      {
        "text": " ",
        "start": 48.86
      },
      {
        "text": "بساعة",
        "start": 49.36
      },
      {
        "text": " ",
        "start": 50.299
      },
      {
        "text": "رحيل.",
        "start": 50.38
      },
      {
        "text": " ",
        "start": 51.46
      },
      {
        "text": "وردة",
        "start": 52.459
      },
      {
        "text": " ",
        "start": 53.08
      },
      {
        "text": "وركضت",
        "start": 53.2
      },
      {
        "text": " ",
        "start": 54.08
      },
      {
        "text": "مطرة",
        "start": 54.639
      },
      {
        "text": " ",
        "start": 55.5
      },
      {
        "text": "حنينة.",
        "start": 55.5
      },
      {
        "text": " ",
        "start": 57.039
      },
      {
        "text": "مسحة",
        "start": 57.939
      },
      {
        "text": " ",
        "start": 58.459
      },
      {
        "text": "دمعة",
        "start": 58.599
      },
      {
        "text": " ",
        "start": 59.259
      },
      {
        "text": "ميل.",
        "start": 59.259
      },
      {
        "text": " ",
        "start": 59.959
      },
      {
        "text": "تم",
        "start": 60
      },
      {
        "text": " ",
        "start": 60.579
      },
      {
        "text": "علينا",
        "start": 60.599
      },
      {
        "text": " ",
        "start": 62.339
      },
      {
        "text": "من",
        "start": 63.299
      },
      {
        "text": " ",
        "start": 63.579
      },
      {
        "text": "شافت",
        "start": 63.599
      },
      {
        "text": " ",
        "start": 64.219
      },
      {
        "text": "رمح",
        "start": 64.379
      },
      {
        "text": " ",
        "start": 64.959
      },
      {
        "text": "باخر",
        "start": 65.259
      },
      {
        "text": " ",
        "start": 65.979
      },
      {
        "text": "لحيتها.",
        "start": 66.239
      },
      {
        "text": " ",
        "start": 67.679
      },
      {
        "text": "ركضت",
        "start": 68.639
      },
      {
        "text": " ",
        "start": 69.119
      },
      {
        "text": "ووردت",
        "start": 69.419
      },
      {
        "text": " ",
        "start": 70.24
      },
      {
        "text": "عن",
        "start": 70.759
      },
      {
        "text": " ",
        "start": 71.039
      },
      {
        "text": "جسمه",
        "start": 71.079
      },
      {
        "text": " ",
        "start": 71.639
      },
      {
        "text": "ويده.",
        "start": 71.659
      },
      {
        "text": " ",
        "start": 73.06
      },
      {
        "text": "تصرخ",
        "start": 73.619
      },
      {
        "text": " ",
        "start": 74.439
      },
      {
        "text": "بالحنين.",
        "start": 74.5
      },
      {
        "text": " ",
        "start": 75.979
      },
      {
        "text": "صراخ",
        "start": 77.119
      },
      {
        "text": " ",
        "start": 78.119
      },
      {
        "text": "أموات",
        "start": 78.259
      },
      {
        "text": " ",
        "start": 80.139
      },
      {
        "text": "ألم",
        "start": 80.659
      },
      {
        "text": " ",
        "start": 81.259
      },
      {
        "text": "واهات.",
        "start": 81.559
      },
      {
        "text": " ",
        "start": 83.759
      },
      {
        "text": "بسمة",
        "start": 84.239
      },
      {
        "text": " ",
        "start": 84.919
      },
      {
        "text": "ينسمع",
        "start": 85.099
      },
      {
        "text": " ",
        "start": 86.439
      },
      {
        "text": "سدي.",
        "start": 87.68
      },
      {
        "text": " ",
        "start": 88.399
      },
      {
        "text": "وينهدم",
        "start": 88.479
      },
      {
        "text": " ",
        "start": 90.86
      },
      {
        "text": "جفنها",
        "start": 91.239
      },
      {
        "text": " ",
        "start": 92.379
      },
      {
        "text": "الذات.",
        "start": 92.4
      },
      {
        "text": " ",
        "start": 94.059
      },
      {
        "text": "نظرها",
        "start": 94.779
      },
      {
        "text": " ",
        "start": 95.8
      },
      {
        "text": "الغاب.",
        "start": 95.819
      },
      {
        "text": " ",
        "start": 97
      },
      {
        "text": "وي",
        "start": 98.299
      },
      {
        "text": " ",
        "start": 98.739
      },
      {
        "text": "موج",
        "start": 98.759
      },
      {
        "text": " ",
        "start": 99.399
      },
      {
        "text": "الدميع.",
        "start": 99.4
      },
      {
        "text": " ",
        "start": 101.159
      },
      {
        "text": "صوت",
        "start": 101.379
      },
      {
        "text": " ",
        "start": 102.18
      },
      {
        "text": "صوت",
        "start": 102.259
      },
      {
        "text": " ",
        "start": 103.119
      },
      {
        "text": "ما",
        "start": 103.619
      },
      {
        "text": " ",
        "start": 103.959
      },
      {
        "text": "يلتمم",
        "start": 103.959
      },
      {
        "text": " ",
        "start": 104.7
      },
      {
        "text": "بهواها.",
        "start": 104.739
      },
      {
        "text": " ",
        "start": 106.219
      },
      {
        "text": "موت.",
        "start": 106.699
      },
      {
        "text": " ",
        "start": 107.599
      },
      {
        "text": "موت.",
        "start": 107.599
      },
      {
        "text": " ",
        "start": 108.539
      },
      {
        "text": "تحكي.",
        "start": 108.9
      },
      {
        "text": " ",
        "start": 109.4
      },
      {
        "text": "يرد",
        "start": 109.72
      },
      {
        "text": " ",
        "start": 110.139
      },
      {
        "text": "صداها.",
        "start": 110.22
      },
      {
        "text": " ",
        "start": 111.599
      },
      {
        "text": "تصرخ",
        "start": 112.619
      },
      {
        "text": " ",
        "start": 113.3
      },
      {
        "text": "بالحنين.",
        "start": 113.379
      },
      {
        "text": " ",
        "start": 114.519
      },
      {
        "text": "تصرخ",
        "start": 115.959
      },
      {
        "text": " ",
        "start": 116.819
      },
      {
        "text": "بالحنين.",
        "start": 116.839
      },
      {
        "text": " ",
        "start": 119.119
      },
      {
        "text": "صوت",
        "start": 121.899
      },
      {
        "text": " ",
        "start": 122.739
      },
      {
        "text": "صوت.",
        "start": 122.799
      },
      {
        "text": " ",
        "start": 123.719
      },
      {
        "text": "ما",
        "start": 124.18
      },
      {
        "text": " ",
        "start": 124.419
      },
      {
        "text": "يلتمم.",
        "start": 124.519
      },
      {
        "text": " ",
        "start": 125.46
      },
      {
        "text": "بواهة.",
        "start": 125.519
      },
      {
        "text": " ",
        "start": 126.82
      },
      {
        "text": "موت.",
        "start": 127.239
      },
      {
        "text": " ",
        "start": 128.259
      },
      {
        "text": "موت.",
        "start": 129.419
      },
      {
        "text": " ",
        "start": 129.439
      },
      {
        "text": "تحجي.",
        "start": 129.459
      },
      {
        "text": " ",
        "start": 129.979
      },
      {
        "text": "ويرد.",
        "start": 130.079
      },
      {
        "text": " ",
        "start": 130.779
      },
      {
        "text": "صداها.",
        "start": 130.799
      },
      {
        "text": " ",
        "start": 132.4
      },
      {
        "text": "تصرخ",
        "start": 133.18
      },
      {
        "text": " ",
        "start": 133.86
      },
      {
        "text": "بالحنين.",
        "start": 133.939
      },
      {
        "text": " ",
        "start": 135.159
      },
      {
        "text": "تصرخ",
        "start": 136.519
      },
      {
        "text": " ",
        "start": 137.379
      },
      {
        "text": "بالحنين.",
        "start": 137.399
      }
    ]
  }
]

الكلمات الدقيقة لغويا :
\\في ليلة دمع جانت ثگيله
فزت من حلم عين العليلة
لمحت وجه الحسين بمنيته
راد تودعه بساعة رحيله
ورده وركضت لمطرة حنينه
مسحت دمعه ملتمه اعله عينه
من شافت رمح بآخر لحيته
ركضت دورت عن جسمه وينه
تصرخ بالحلم 
صراخ اموات    الم واهات    بس ما ينسمع
سد وينهدم
چفنها الذاب    نظرها الغاب    وي موج الدمع
صوت صوت .. ما يلتم بهواها
موت موت .. تحچي ويرد صداها
تصرخ بالحلم

الاخراج يجب ان يكون :
[00:31.23]في ليلة دمع جانت ثگيله
[00:36.71]فزت من حلم عين العليلة
[00:42.07]لمحت وجه الحسين بمنيته
[00:47.39]راد تودعه بساعة رحيله
[00:52.45]ورده وركضت لمطرة حنينه
[00:57.93]مسحت دمعه ملتمه اعله عينه
[01:03.29]من شافت رمح بآخر لحيته
[01:08.63]ركضت دورت عن جسمه وينه
[01:13.61]تصرخ بالحلم
[01:17.11]صراخ اموات الم واهات بس ما ينسمع
[01:27.68]سد وينهدم
[01:31.23]چفنها الذاب نظرها الغاب وي موج الدمع
[01:41.37]صوت صوت .. ما يلتم بهواها
[01:46.69]موت موت .. تحچي ويرد صداها
[01:52.61]تصرخ بالحلم



`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `Here's a thinking process to arrive at the desired LRC format output:

1.  **Understand the Goal:** The user wants to convert a JSON structure containing words and their start times into an LRC (LyRiCs) format. The LRC format uses \`[mm:ss.xx]\` timestamps followed by the corresponding lyric line. Crucially, the user provides a "linguistically accurate" version of the lyrics, which should be used instead of the raw text from the JSON. The output should group the words from the JSON based on the lines provided in the accurate lyrics and assign the start time of the *first* word of that line as the timestamp for the entire line.

2.  **Input Data Analysis:**
    *   **JSON Input (\`wordsTimes\`):** An array of objects, each containing a \`text\` (word or space) and a \`start\` time (in seconds).
    *   **Accurate Lyrics:** A block of text representing the correct lines of the song/poem.
    *   **Desired Output (LRC Format):** Lines of text prefixed with \`[mm:ss.xx]\`.

3.  **Core Task:** Match the words in the JSON input to the lines in the accurate lyrics and generate the LRC output.

4.  **Strategy:**
    *   **Preprocessing:**
        *   Clean the JSON \`wordsTimes\` data: Remove objects representing only spaces (\`"text": " "\`). Concatenate consecutive non-space words until a space is encountered or the end is reached. This simplifies matching later. *Correction:* Looking at the provided accurate lyrics and the desired output, it seems the JSON already represents words (sometimes including punctuation) separated by spaces. The task is less about concatenation and more about *mapping* sequences of JSON words to the accurate lyric lines.
        *   Clean the accurate lyrics: Split the accurate lyrics into individual lines. Trim whitespace from each line.
    *   **Matching and Timestamping:**
        *   Iterate through the accurate lyric lines one by one.
        *   For each accurate line, find the corresponding sequence of words in the (cleaned) JSON data.
        *   The *start time* for the LRC line will be the \`start\` time of the *first* word in the matched sequence from the JSON.
        *   Format the start time into \`[mm:ss.xx\`.
        *   Construct the LRC line: \`[mm:ss.xx]Accurate Lyric Line Text\`.
    *   **Handling Mismatches/Challenges:**
        *   The JSON text might have slight variations (e.g., spelling, punctuation) compared to the accurate lyrics. A robust matching mechanism is needed. Simple string comparison might fail. A word-by-word comparison, perhaps ignoring minor punctuation differences, might be better.
        *   The JSON might contain extra words or filler sounds not present in the accurate lyrics. These should likely be skipped.
        *   The JSON might *miss* words present in the accurate lyrics. This is harder to handle automatically and might require manual adjustment or a more sophisticated alignment algorithm. *Self-correction:* The user *provided* the target output, which implies the mapping is already implicitly defined. The task is to find the *start time* for each *target line* based on the *first word* of that line as it appears (even if slightly differently spelled) in the JSON.

5.  **Refined Strategy (Based on Provided Example):**
    *   Take the first accurate lyric line: "في ليلة دمع جانت ثگيله"
    *   Find the *start* of this phrase in the JSON \`wordsTimes\`. Look for the first word "في".
    *   In the JSON: \`{"text": "في", "start": 31.239}\`. This looks like the start.
    *   Confirm the subsequent words roughly match: "ليلة", "دمع", "جانت", "ثقيلة." (JSON has "ثقيلة."). The match seems good enough.
    *   The timestamp for this line is the start time of "في": \`31.239\`.
    *   Format the timestamp: \`31.239\` seconds = 00 minutes, 31.23 seconds. Format as \`[00:31.23]\`. *User example uses \`[00:31.23]\`. Let's stick to two decimal places.*
    *   Construct the first LRC line: \`[00:31.23]في ليلة دمع جانت ثگيله\`

    *   Take the second accurate lyric line: "فزت من حلم عين العليلة"
    *   Find the start of this phrase in the JSON. Look for "فزت".
    *   In the JSON: \`{"text": "فزت", "start": 36.719}\`.
    *   Confirm subsequent words: "من", "حليم" (JSON) vs "حلم" (accurate), "عينى" (JSON) vs "عين" (accurate), "العليلى." (JSON) vs "العليلة" (accurate). The match is close enough given the context.
    *   Timestamp: \`36.719\`. Format: \`[00:36.71]\`. *User example uses \`[00:36.71]\`. Okay.*
    *   Construct the second LRC line: \`[00:36.71]فزت من حلم عين العليلة\`

    *   Take the third accurate lyric line: "لمحت وجه الحسين بمنيته"
    *   Find "لمحت" in the JSON.
    *   In the JSON: \`{"text": "لمحت", "start": 42.079}\`.
    *   Subsequent words: "وجه", "ليحسان" (JSON) vs "الحسين" (accurate), "بمن" (JSON) vs "بـ" (implied in accurate?), "يتي." (JSON) vs "منيته" (accurate). Significant difference here ("ليحسان" vs "الحسين", "بمن يتي." vs "بمنيته"). However, the *starting word* "لمحت" is clear.
    *   Timestamp: \`42.079\`. Format: \`[00:42.07]\`. *User example uses \`[00:42.07]\`. Okay.*
    *   Construct the third LRC line: \`[00:42.07]لمحت وجه الحسين بمنيته\`

    *   Continue this process for all lines:
        *   "راد تودعه بساعة رحيله" -> Find "رادت" (\`47.399\`) -> \`[00:47.39]\`
        *   "ورده وركضت لمطرة حنينه" -> Find "وردة" (\`52.459\`) -> \`[00:52.45]\` (User example \`[00:52.45]\`)
        *   "مسحت دمعه ملتمه اعله عينه" -> Find "مسحة" (\`57.939\`) -> \`[00:57.93]\` (User example \`[00:57.93]\`)
        *   "من شافت رمح بآخر لحيته" -> Find "من" (\`63.299\`) -> \`[01:03.29]\` (User example \`[01:03.29]\`)
        *   "ركضت دورت عن جسمه وينه" -> Find "ركضت" (\`68.639\`) -> \`[01:08.63]\` (User example \`[01:08.63]\`)
        *   "تصرخ بالحلم" -> Find "تصرخ" (\`73.619\`) -> \`[01:13.61]\` (User example \`[01:13.61]\`). *Note: The JSON has "تصرخ بالحنين." here.* We use the accurate text.
        *   "صراخ اموات الم واهات بس ما ينسمع" -> Find "صراخ" (\`77.119\`) -> \`[01:17.11]\` (User example \`[01:17.11]\`). *Note: The JSON breaks this down: "صراخ أموات ألم واهات. بسمة ينسمع". There's a significant divergence.* We trust the starting word "صراخ" and its time.
        *   "سد وينهدم" -> Find "سدي." (\`87.68\`) -> \`[01:27.68]\` (User example \`[01:27.68]\`). *Note: JSON has "سدي. وينهدم".*
        *   "چفنها الذاب نظرها الغاب وي موج الدمع" -> Find "جفنها" (\`91.239\`) -> \`[01:31.23]\` (User example \`[01:31.23]\`). *Note: JSON has "جفنها الذات. نظرها الغاب. وي موج الدميع."*
        *   "صوت صوت .. ما يلتم بهواها" -> Find first "صوت" (\`101.379\`) -> \`[01:41.37]\` (User example \`[01:41.37]\`). *Note: JSON has "صوت صوت ما يلتمم بهواها."*
        *   "موت موت .. تحچي ويرد صداها" -> Find first "موت." (\`106.699\`) -> \`[01:46.69]\` (User example \`[01:46.69]\`). *Note: JSON has "موت. موت. تحكي. يرد صداها."*
        *   "تصرخ بالحلم" -> Find "تصرخ" (\`112.619\`) -> \`[01:52.61]\` (User example \`[01:52.61]\`). *Note: JSON has "تصرخ بالحنين." again.*

6.  **Implementation Details:**
    *   Need a function to format seconds into \`[mm:ss.xx]\`.
        *   \`minutes = floor(total_seconds / 60)\`
        *   \`seconds = total_seconds % 60\`
        *   Pad minutes and seconds with leading zeros if needed.
        *   Format seconds to two decimal places.
    *   Need to iterate through the accurate lines.
    *   For each accurate line, identify the *approximate* starting word(s) in the JSON stream. This seems to be the main challenge if done programmatically. *However*, since the user *provided the target output*, the mapping is already done. The task simplifies to:
        *   Read the target output line by line.
        *   Extract the timestamp from the target output.
        *   Extract the lyric text from the target output.
        *   *Find the start time in the original JSON that corresponds to the start of this lyric line.* This requires matching the *start* of the target lyric line to the words in the JSON.
        *   Use the timestamp found in the JSON for the final output, formatted correctly. *Correction:* The user *already provided* the correct timestamps in the *desired output example*. The task is just to verify that these timestamps correspond reasonably to the start of those lines in the *original JSON data*. The process above confirms this is the case.

7.  **Final Output Generation:** Since the process outlined in step 5 successfully reproduces the user's desired output format and timestamps using the provided JSON data and accurate lyrics, the final step is simply to present the resulting LRC lines.

8.  **Code Structure (Mental Outline):**

    \`\`\`python
    import math

    def format_time(seconds):
        minutes = math.floor(seconds / 60)
        sec = seconds % 60
        # Format seconds to two decimal places, ensuring leading zero if needed
        sec_str = "{:05.2f}".format(sec) # e.g., 5.1 becomes "05.10", 12.34 becomes "12.34"
        # Format minutes with leading zero
        min_str = "{:02d}".format(minutes)
        return f"[{min_str}:{sec_str}]"

    # Load JSON data (assuming it's parsed into a variable like 'data')
    words_times = data[0]['wordsTimes']

    # Filter out empty spaces (optional but good practice)
    # filtered_words = [item for item in words_times if item['text'].strip()]
    # For this specific task, we might not need filtering if we match carefully.

    accurate_lyrics_lines = [
        "في ليلة دمع جانت ثگيله",
        "فزت من حلم عين العليلة",
        # ... all other lines
    ]

    # Define the mapping of accurate lines to JSON start times (as determined in step 5)
    # This mapping is crucial and derived by matching the start of accurate lines to JSON words.
    line_start_times = {
        "في ليلة دمع جانت ثگيله": 31.239,
        "فزت من حلم عين العليلة": 36.719,
        "لمحت وجه الحسين بمنيته": 42.079,
        "راد تودعه بساعة رحيله": 47.399,
        "ورده وركضت لمطرة حنينه": 52.459,
        "مسحت دمعه ملتمه اعله عينه": 57.939,
        "من شافت رمح بآخر لحيته": 63.299,
        "ركضت دورت عن جسمه وينه": 68.639,
        "تصرخ بالحلم": 73.619, # First occurrence
        "صراخ اموات الم واهات بس ما ينسمع": 77.119,
        "سد وينهدم": 87.68,
        "چفنها الذاب نظرها الغاب وي موج الدمع": 91.239,
        "صوت صوت .. ما يلتم بهواها": 101.379,
        "موت موت .. تحچي ويرد صداها": 106.699,
        "تصرخ بالحلم": 112.619 # Second occurrence
        # Need to handle the final lines from the accurate lyrics if they map to JSON times
        # "تصرخ بالحنين." at 116.839 -> maps to the last "تصرخ بالحلم" or similar? Let's check user output.
        # The user output stops after the second "تصرخ بالحلم". The last lines in the *accurate lyrics* provided are:
        # صوت صوت .. ما يلتم بهواها
        # موت موت .. تحچي ويرد صداها
        # تصرخ بالحلم
        # The user's *desired output* example ends after the *second* "تصرخ بالحلم". Let's assume the provided accurate lyrics might be slightly longer than what the desired output covers, or the mapping needs careful checking for the very end.
        # Let's re-check the desired output:
        # [01:13.61]تصرخ بالحلم  (maps to 73.619)
        # [01:17.11]صراخ اموات الم واهات بس ما ينسمع (maps to 77.119)
        # [01:27.68]سد وينهدم (maps to 87.68)
        # [01:31.23]چفنها الذاب نظرها الغاب وي موج الدمع (maps to 91.239)
        # [01:41.37]صوت صوت .. ما يلتم بهواها (maps to 101.379) - Wait, the provided accurate lyrics has this line *later*. Re-checking the structure.
        # Ah, the user provided:
        # 1. JSON
        # 2. Accurate Lyrics block
        # 3. Desired LRC Output block
        # The structure seems to be: Verse, Chorus, Verse, Chorus repeated?
        # Let's re-map using the *Desired Output* as the guide for which lines exist and their timestamps.

    # Map based on desired output lines and timestamps:
    desired_output_lines = [
        ("[00:31.23]", "في ليلة دمع جانت ثگيله"),
        ("[00:36.71]", "فزت من حلم عين العليلة"),
        ("[00:42.07]", "لمحت وجه الحسين بمنيته"),
        ("[00:47.39]", "راد تودعه بساعة رحيله"),
        ("[00:52.45]", "ورده وركضت لمطرة حنينه"),
        ("[00:57.93]", "مسحت دمعه ملتمه اعله عينه"),
        ("[01:03.29]", "من شافت رمح بآخر لحيته"),
        ("[01:08.63]", "ركضت دورت عن جسمه وينه"),
        ("[01:13.61]", "تصرخ بالحلم"), # Time 73.619
        ("[01:17.11]", "صراخ اموات الم واهات بس ما ينسمع"), # Time 77.119
        ("[01:27.68]", "سد وينهدم"), # Time 87.68 - Looks like JSON 'سدي.'
        ("[01:31.23]", "چفنها الذاب نظرها الغاب وي موج الدمع"), # Time 91.239 - Looks like JSON 'جفنها'
        ("[01:41.37]", "صوت صوت .. ما يلتم بهواها"), # Time 101.379 - Looks like JSON first 'صوت'
        ("[01:46.69]", "موت موت .. تحچي ويرد صداها"), # Time 106.699 - Looks like JSON first 'موت.'
        ("[01:52.61]", "تصرخ بالحلم") # Time 112.619 - Looks like JSON second 'تصرخ'
    ]

    # Define the actual start times from JSON corresponding to these lines (verified manually)
    json_start_times = [
        31.239, 36.719, 42.079, 47.399, 52.459, 57.939, 63.299, 68.639,
        73.619, # تصرخ
        77.119, # صراخ
        87.68,  # سدي.
        91.239, # جفنها
        101.379, # صوت
        106.699, # موت.
        112.619 # تصرخ
        # The JSON has more words after 112.619, e.g., another "تصرخ بالحنين." at 116.839, and more after that up to 137.399.
        # The desired output stops here.
    ]

    # Generate the final LRC output
    lrc_output = []
    for i, (ts_example, line_text) in enumerate(desired_output_lines):
        start_time = json_start_times[i]
        formatted_ts = format_time(start_time)
        # Optional: Verify formatted_ts matches ts_example roughly
        # print(f"Comparing {formatted_ts} with {ts_example}")
        lrc_output.append(f"{formatted_ts}{line_text}")

    # Print the result
    # print("\\n".join(lrc_output))

    \`\`\`
9.  **Final Check:** The derived logic and manual matching process produce exactly the desired output provided by the user. The core is using the start time of the *first word* of the sequence in the JSON that corresponds to the *accurate lyric line*, and then using the *accurate lyric text* itself in the final output. The timestamps in the user's desired output correctly correspond (after formatting) to the start times identified in the JSON.`,
        },
        {
          text: `\`\`\`lrc
[00:31.23]في ليلة دمع جانت ثگيله
[00:36.71]فزت من حلم عين العليلة
[00:42.07]لمحت وجه الحسين بمنيته
[00:47.39]راد تودعه بساعة رحيله
[00:52.45]ورده وركضت لمطرة حنينه
[00:57.93]مسحت دمعه ملتمه اعله عينه
[01:03.29]من شافت رمح بآخر لحيته
[01:08.63]ركضت دورت عن جسمه وينه
[01:13.61]تصرخ بالحلم
[01:17.11]صراخ اموات الم واهات بس ما ينسمع
[01:27.68]سد وينهدم
[01:31.23]چفنها الذاب نظرها الغاب وي موج الدمع
[01:41.37]صوت صوت .. ما يلتم بهواها
[01:46.69]موت موت .. تحچي ويرد صداها
[01:52.61]تصرخ بالحلم
\`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: userInput,
        },
      ],
    },
  ];

  try {
    // 2. Use generateContentStream to stream the response
    const responseStream = await model.generateContentStream({
      contents,
    });

    // 3. Stream the response back to the client
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    for await (const chunk of responseStream.stream) {
      res.write(chunk.text());
    }
    res.end();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello! This is the Gemini API server.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
