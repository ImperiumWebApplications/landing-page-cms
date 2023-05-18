import { ContentPage, queryContentPageContent } from '../lib/next/app';
import { Layout } from '../components/Layout/Layout';
import {
  AppointmentForm,
  useDateOptions,
  useLocationOptions,
} from '../features/Appointment';

const AppointmentPage: ContentPage = ({ content, staticContent }) => {
  const locationOptions = useLocationOptions(content);
  const dateOptions = useDateOptions(content.appointment);

  return (
    <Layout content={content} staticContent={staticContent}>
      <AppointmentForm
        steps={[
          {
            type: 'location',
            label: 'Terminart',
            heading: 'Wo soll Ihr Termin statt finden?',
            options: locationOptions,
          },
          {
            type: 'dates',
            label: 'Terminvorschläge',
            heading: 'Was sind Ihre Wunschtermine?',
            description: `Planen Sie für unser persönliches Gespräch ca. ${dateOptions.duration} Minuten ein.`,
            options: dateOptions,
          },
          {
            type: 'details',
            label: 'Kontaktdaten',
            heading: 'Kontaktdaten',
          },
          {
            type: 'confirmation',
            label: 'Bestätigung',
            heading: 'Vielen Dank!',
            description: 'Ihre Anfrage wurde erfolgreich an uns gesendet',
          },
        ]}
      />
    </Layout>
  );
};

export const getServerSideProps = queryContentPageContent;

export default AppointmentPage;
