import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTable, Column } from 'react-table';

import { COLORS, FONT_STYLES, PADDING } from '../styles';

export interface TableProps {
  columns: Column[];
  data: object[];
  hideHeaders?: boolean;
}

export const Table: React.FC<TableProps> = ({ columns, data, hideHeaders }) => {
  const { headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <View>
      {!hideHeaders &&
        headerGroups.map((headerGroup) => (
          <View>
            {headerGroup.headers.map((column) => (
              <View>{column.render('Header')}</View>
            ))}
          </View>
        ))}

      {rows.map((row, rowIndex) => {
        prepareRow(row);

        return (
          <View
            style={{ ...styles.row, ...(rowIndex < rows.length - 1 ? styles.borderBottom : {}) }}
          >
            {row.cells.map((cell, index) => {
              return (
                <View
                  style={{
                    ...styles.cell,
                    ...(index < row.cells.length - 1 ? styles.borderRight : {}),
                  }}
                >
                  <Text
                    style={{
                      ...styles.text,
                      ...(index < row.cells.length - 1 ? {} : styles.alignRight),
                    }}
                  >
                    {cell.render('Cell')}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: PADDING.SMALL,
  },
  cell: {
    flex: 1,
    paddingVertical: PADDING.SMALL / 2,
  },
  text: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARK,
  },
  borderBottom: {
    borderBottomColor: COLORS.MAIN_DARK,
    borderBottomWidth: 1,
  },
  borderRight: {
    borderRightColor: COLORS.MAIN_DARK,
    borderRightWidth: 1,
  },
  alignRight: {
    textAlign: 'right',
  },
});
