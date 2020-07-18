INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Tommy', 'Chong', 1, null),
('Mick', 'Jagger', 2, 1),
('Charles', 'Bukowski', 2, 1),
('Tom', 'Waits', 3, null),
('Vince', 'Noir', 4, 4),
('Johann Sebastian', 'Bach', 4, 4),
('Homer', 'Simpson', 5, null),
('Butters', 'Stotch', 6, null),
('Scooby', 'Doo', 7, 6);