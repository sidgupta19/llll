import { Icon } from '@iconify/react';
import { Button, Input } from '../../components/ui';
import styles from './styles/Options.module.css';

export default function Options({
  question,
  addOption,
  handleAnswerChange,
  deleteOption,
  handleOptionChange,
  actions,
}) {
  return (
    <div className={styles.optionsGroup}>
      <div className={styles.options}>
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name="options"
              onChange={() => handleAnswerChange(question._id, index)}
              checked={question.answer == index}
              id={index}
            />
            <label htmlFor={index}>
              {question.optionsType !== 'image' && (
                <Input
                  value={option.text}
                  onChange={(val) =>
                    handleOptionChange(question._id, index, 'text', val)
                  }
                  placeholder="Text"
                />
              )}
              {question.optionsType !== 'text' && (
                <Input
                  value={option.image}
                  onChange={(val) =>
                    handleOptionChange(question._id, index, 'image', val)
                  }
                  placeholder="Image url"
                />
              )}
            </label>
            {index >= 2 && (
              <Icon
                onClick={() => deleteOption(question._id, index)}
                style={{
                  fontSize: '1.5rem',
                  color: 'red',
                  cursor: 'pointer',
                }}
                icon="mingcute:delete-2-line"
                className={styles.deleteIcon}
              />
            )}
          </div>
        ))}
      </div>
      {actions !== 'update' && question.options.length < 4 && (
        <Button onClick={() => addOption(question._id, question.optionsType)}>
          Add Option
        </Button>
      )}
    </div>
  );
}

// dealing with a question

// DEFAULT OPTIONS
// if type is text --> add option = {text: ""} <-- default when creating quiz
// --         image --> add option = {image: ""}
// --         text and image --> add option = {text:"" , image: ""}

// 1) When do i update option
// -- input state changes
// -- type changes (empty all options states and update to default options)

// 2) When do i add option
// -- on click on add option button
