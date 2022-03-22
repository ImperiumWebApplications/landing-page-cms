import type {
  ContactData,
  QuestionnaireItem,
} from '../../../../context/Questionnaire/state';
import { InternalAPI } from '../../internal';

export const enrichPostalCodeValue = (data: {
  host: string;
  contact: ContactData;
  questionnaire: QuestionnaireItem[];
}) => {
  try {
    const postalCode = data.contact.postalCode.value;
    const postalCodeDetails = InternalAPI.getPostalCodeDetails(postalCode);
    return `${postalCode} (${postalCodeDetails.community})`;
  } catch {
    return data.contact.postalCode.value;
  }
};
