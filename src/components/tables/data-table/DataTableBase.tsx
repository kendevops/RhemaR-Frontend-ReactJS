/**
 * Ref: https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--page
 */

import React from 'react';
import DataTable, { TableProps } from 'react-data-table-component';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate: boolean) => isIndeterminate };

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
    return (
        <DataTable
            pagination
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={selectProps}
            sortIcon={sortIcon}
            dense
            //direction="auto"
            expandableRows
            fixedHeaderScrollHeight="300px"
            pointerOnHover
            responsive
            selectableRows
            selectableRowsHighlight
            //selectableRowsRadio="checkbox"
            //subHeaderAlign="right"
            subHeaderWrap

            {...props}
        />
    );
}

export default DataTableBase;
