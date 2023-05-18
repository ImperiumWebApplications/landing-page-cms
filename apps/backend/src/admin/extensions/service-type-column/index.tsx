import { ServiceTypeCell } from './components/ServiceTypeCell';

export const registerServiceTypeColumn = (app: any) => {
  app.registerHook(
    'Admin/CM/pages/ListView/inject-column-in-table',
    ({ displayedHeaders, layout }) => {
      // Only modify columns for the questionnaire content type
      if (layout.contentType.apiID !== 'questionnaire')
        return { layout, displayedHeaders };

      return {
        layout,
        displayedHeaders: [
          ...displayedHeaders.slice(0, 2),
          {
            key: '__custom-service-type_key__', // Needed for the table
            fieldSchema: { type: 'string' }, // Schema of the attribute
            metadatas: {
              label: 'Branche',
            },
            name: 'service_type',
            cellFormatter: ServiceTypeCell,
          },
          ...displayedHeaders.slice(2),
        ],
      };
    },
  );
};
