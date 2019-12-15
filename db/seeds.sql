USE employee_db;

INSERT INTO department (name) VALUES
    ('Founders'),
    ('Sales'),
    ('Marketing'),
    ('IT');

INSERT INTO role (title, salary, department_id) VALUES
    ('Chief Executive Officer', 144000, 1),
    ('Account Executive', 96000, 2),
    ('Sales Representative', 60000, 2),
    ('Marketing Director', 80000, 3),
    ('Marketing Designer', 65000, 3),
    ('Social Media Expert', 40000, 3),
    ('Server Administrator', 90000, 4),
    ('Software Engineer', 74000, 4),
    ('Tech Support', 45000, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES
    ('Luvenia', 'Walters', 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Christie', 'Ware', 2, 1),
    ('Philis', 'Siddall', 3, 2),
    ('Augusta', 'Rush', 3, 2),
    ('Ryker', 'Devereux', 3, 1),
    ('Katharyn', 'Jeffery', 4, 5),
    ('Goldie', 'Bean', 5, 5),
    ('Rubye', 'Belcher', 5, 5),
    ('Kerena', 'Sumner', 5, 5),
    ('Hadley', 'Neal', 6, 5),
    ('Kevin', 'Gage', 6, 5),
    ('Jensen', 'Mann', 7, 1),
    ('Avis', 'James', 8, 12),
    ('Donny', 'Bates', 8, 12),
    ('Elihu', 'Hobson', 8, 12),
    ('Kelvin', 'May', 8, 12),
    ('Cailin', 'Mark', 9, 12),
    ('Walton', 'Dennell', 9, 12),
    ('Eleanore', 'Leonard', 9, 12);
