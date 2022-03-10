<h1 align="center">Quiz Toggle</h1>

## Features

- Responsive down to 320px
- Once all guesses are correct, the toggles will lock and a button for the next question will appear.
- Toggles are animated. This animation works regardless of whether or not the toggle has wrapped to a new line or not.
- Component supports multiple questions and any number of answer pairs. All the data is stored in a separate JSON file which is an array of objects containing the following information:

```json
{
  "question": "Example Question?",
  "answerOptions": [
    ["Answer1A", "Answer1B"],
    ["Answer2A", "Answer2B"],
    ["Answer3A", "Answer3B"]
  ],
  "correct": [0, 1, 0]
}
```

- Type checking through Typescript
- Background colours changes in response to how "correct" the answer is. This works with any number of colours (provided they have been correctly defined) and any number of questions.
- The initial selections for the first question are random and will never accidentally land all correct.

## Limitations/Issues

- Although responsiveness was considered regarding more than 2 answer options, it currently does not support it. The animation for the bubble and the logic for selection would have to be adapted.
- Initial selections for the rest of the questions and their order are not random.

## Built With 🛠

- [Create React App](https://create-react-app.dev/) project with [`TypeScript`](https://create-react-app.dev/docs/adding-typescript/).
- [Sass](https://sass-lang.com/)

## Demo

Clone and install.

```bash
git clone https://github.com/TheThomasY/quiz-toggle
cd quiz-toggle
npm install
```

Run a development server.

```bash
npm run start
```

## Author 🧑

**Tom Young**

- [Github Profile 👨‍💻](https://github.com/TheThomasY)
- [Email ✉](mailto:tomyoungdev@gmail.com?subject=Hi 'Hi!')
- [LinkedIn 💼](https://www.linkedin.com/in/tom-young5555/)
- [Dev.to 🖊](https://dev.to/thetomy)

Give a ⭐️ if you like this project!
