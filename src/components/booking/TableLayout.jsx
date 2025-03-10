import React, { useState, useEffect } from 'react';
import { Button, Badge, Row, Col, Container } from 'react-bootstrap';
import { useBooking } from '../../hooks/useBooking';

const dummyTables = [
  { id: 1, number: 1, capacity: 2 },
  { id: 2, number: 2, capacity: 2 },
  { id: 3, number: 3, capacity: 4 },
  { id: 4, number: 4, capacity: 4 },
  { id: 5, number: 5, capacity: 6 },
  { id: 6, number: 6, capacity: 8 },
];

const TableLayout = ({ selectedDate, selectedTime, guestCount, selectedTable, onTableSelect }) => {
  const { getAvailableTables } = useBooking();
  const [tables, setTables] = useState(dummyTables);
  const [availableTables, setAvailableTables] = useState([]);

  useEffect(() => {
    const fetchAvailableTables = async () => {
      if (selectedDate && selectedTime && guestCount) {
        const available = tables.filter(table => table.capacity >= guestCount);
        setAvailableTables(available.map(table => table.id));
      } else {
        setAvailableTables([]);
      }
    };
    fetchAvailableTables();
  }, [selectedDate, selectedTime, guestCount]);

  const isTableAvailable = (tableId) => availableTables.includes(tableId);
  const isTableSelected = (tableId) => selectedTable === tableId;

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <Badge bg="success">Available</Badge> <Badge bg="primary">Selected</Badge> <Badge bg="secondary">Unavailable</Badge>
        </Col>
      </Row>

      <Row>
        {tables.map((table) => {
          const available = isTableAvailable(table.id);
          const selected = isTableSelected(table.id);

          return (
            <Col xs={4} key={table.id} className="text-center">
              <Button
                variant={selected ? 'primary' : available ? 'success' : 'secondary'}
                disabled={!available}
                onClick={() => onTableSelect(selected ? null : table.id)}
                className="w-100 mb-2"
              >
                Table {table.number} ({table.capacity} guests)
              </Button>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default TableLayout;
