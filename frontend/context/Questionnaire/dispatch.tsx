import {
  ContactData,
  QuestionnaireContextState,
  QuestionnaireItem,
} from './state';

export type QuestionnaireContextDispatch = (
  action: QuestionnaireContextAction,
) => void;

export type QuestionnaireContextAction =
  | {
      type: 'SET_CURRENT_INDEX';
      payload: {
        newIndex: number;
      };
    }
  | {
      type: 'SAVE_ANSWER';
      payload: {
        currentIndex: number;
        item: QuestionnaireItem;
      };
    }
  | {
      type: 'SET_CONTACT_DETAILS';
      payload: {
        field: keyof ContactData;
        value: string | boolean;
      };
    };

export const QuestionnaireContextReducer = (
  state: QuestionnaireContextState,
  action: QuestionnaireContextAction,
): QuestionnaireContextState => {
  switch (action.type) {
    case 'SET_CURRENT_INDEX': {
      return {
        ...state,
        currentIndex: action.payload.newIndex,
      };
    }
    case 'SAVE_ANSWER': {
      const updatedQuestionnaire = [...state.questionnaire];
      updatedQuestionnaire[action.payload.currentIndex] = action.payload.item;
      return {
        ...state,
        questionnaire: updatedQuestionnaire,
      };
    }
    case 'SET_CONTACT_DETAILS': {
      const updatedContactField = { ...state.contact[action.payload.field] };
      updatedContactField.value = action.payload.value;
      return {
        ...state,
        contact: {
          ...state.contact,
          [action.payload.field]: updatedContactField,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
    }
  }
};
