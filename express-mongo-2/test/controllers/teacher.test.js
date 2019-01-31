const teacher = require('../../controllers/teacher');

test('check test of model: teacher', () => {
    expect(teacher.pruebas())
    .toBe({ message: 'Test controller:teacher' })
})