import { Component } from 'react';
import { Switch, Button } from '@patternfly/react-core';
import { Table, TableBody, TableHeader } from '@patternfly/react-table/deprecated';

interface SwitchState {
  simple: {
    isChecked: boolean;
  };
  table: {
    data: { id: string; isChecked: boolean }[];
    all: boolean;
  };
}

export class SwitchDemo extends Component<{}, SwitchState> {
  static displayName = 'SwitchDemo';
  state = {
    simple: {
      isChecked: true
    },
    table: {
      data: [
        { id: 'id1', isChecked: false },
        { id: 'id2', isChecked: false },
        { id: 'id3', isChecked: false }
      ],
      all: true
    }
  };

  handleChangeSimple = (_event: React.FormEvent<HTMLInputElement>, isChecked: boolean) => {
    this.setState({ simple: { isChecked } });
  };

  handleChangeTable = (id: string) => (_event: React.FormEvent<HTMLInputElement>, isChecked: boolean) => {
    this.setState({
      table: {
        ...this.state.table,
        data: this.state.table.data.map((d) => (d.id === id ? { ...d, isChecked } : d))
      }
    });
  };

  showAllTable = () => {
    this.setState({ table: { ...this.state.table, all: !this.state.table.all } });
  };

  renderSimple() {
    const {
      simple: { isChecked }
    } = this.state;
    return (
      <>
        <Switch
          id="simple-switch"
          label={<div style={{ color: 'green' }}>Message when on</div>}
          onChange={this.handleChangeSimple}
          aria-label="Switch"
          isChecked={isChecked}
        />
        <br />
        <Switch id="disabled-switch-off" label="Message when on" isChecked={false} isDisabled />
      </>
    );
  }

  renderTable() {
    const cols = [{ title: 'hello' }];
    const {
      table: { data, all }
    } = this.state;
    let rr = data;
    if (!all) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_first, ...rest] = data;
      rr = rest;
    }
    const rows = rr.map((r) => ({
      cells: [
        {
          title: <Switch id={r.id} isChecked={r.isChecked} onChange={this.handleChangeTable(r.id)} />
        }
      ]
    }));
    return (
      <div>
        <Table aria-label="simple table" cells={cols} rows={rows}>
          <TableHeader />
          <TableBody />
        </Table>
        <Button id="showAll" onClick={this.showAllTable}>
          Show all
        </Button>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderSimple()}
        {this.renderTable()}
      </>
    );
  }
}
