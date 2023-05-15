import React, { ReactNode } from 'react';

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Typography,
  Flex,
  IconButton,
} from '@strapi/design-system';

type TableViewProps = {
  entries: any[];
  actions: {
    label: string;
    icon: ReactNode;
    onClick: (entry: any) => void;
  }[];
  style?: React.CSSProperties;
};

const TableView: React.FC<TableViewProps> = (props) => {
  return (
    <Box padding={8} background="neutral100" style={props.style}>
      <Table colCount={6} rowCount={props.entries.length}>
        <Thead>
          <Tr>
            <Th>{/* Spacer */}</Th>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Type</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Brand</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Domain</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Actions</Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.entries.map((entry) => (
            <Tr key={entry.id}>
              <Td>{/* Spacer */}</Td>
              <Td>
                <Typography textColor="neutral800">{entry.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.__type}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {entry.brand_name}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.domain}</Typography>
              </Td>
              <Td>
                <Flex>
                  {props.actions.map((action, i) => {
                    const Button = (
                      <IconButton
                        key={i === 0 ? i : undefined}
                        onClick={() => action.onClick(entry)}
                        label={action.label}
                        noBorder
                        icon={action.icon}
                      />
                    );
                    return i === 0 ? (
                      Button
                    ) : (
                      <Box key={i} paddingLeft={1}>
                        {Button}
                      </Box>
                    );
                  })}
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableView;
