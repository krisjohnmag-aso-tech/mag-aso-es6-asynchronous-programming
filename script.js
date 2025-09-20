class Student {
  constructor(id, name, age, courseId) {
    this.id = id
    this.name = name
    this.age = age
    this.courseId = courseId
  }
}

class Course {
  constructor(id, title, description, instructorId) {
    this.id = id
    this.title = title
    this.description = description
    this.instructorId = instructorId
  }
}

class Instructor {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

async function loadData() {
  const response = await fetch('data/students.json')
  const data = await response.json()
  return data
}

function displayStudents(students) {
  const div = document.getElementById('students')
  const ul = document.createElement('ul')
  students.forEach(s => {
    const li = document.createElement('li')
    li.textContent = `${s.name} (${s.age})`
    if (s.age > 21) {
      li.classList.add('over21')
      li.textContent += ' *'
    }
    ul.appendChild(li)
  })
  div.innerHTML = '<h2>Students</h2>'
  div.appendChild(ul)
}

function displayCourses(courses) {
  const div = document.getElementById('courses')
  const ul = document.createElement('ul')
  courses.forEach(c => {
    const li = document.createElement('li')
    li.textContent = `${c.title}: ${c.description}`
    ul.appendChild(li)
  })
  div.innerHTML = '<h2>Courses</h2>'
  div.appendChild(ul)
}

function displayInstructors(instructors) {
  const div = document.getElementById('instructors')
  const ul = document.createElement('ul')
  instructors.forEach(i => {
    const li = document.createElement('li')
    li.textContent = i.name
    ul.appendChild(li)
  })
  div.innerHTML = '<h2>Instructors</h2>'
  div.appendChild(ul)
}

function displayRelationships(students, courses, instructors) {
  const div = document.getElementById('relationships')
  const ul = document.createElement('ul')
  students.forEach(s => {
    const course = courses.find(c => c.id === s.courseId)
    const instructor = instructors.find(i => i.id === course.instructorId)
    const li = document.createElement('li')
    li.textContent = `${s.name} is enrolled in ${course.title} taught by ${instructor.name}`
    ul.appendChild(li)
  })
  div.innerHTML = '<h2>Relationships</h2>'
  div.appendChild(ul)
}

loadData().then(data => {
  const students = data.students.map(s => new Student(s.id, s.name, s.age, s.courseId))
  const courses = data.courses.map(c => new Course(c.id, c.title, c.description, c.instructorId))
  const instructors = data.instructors.map(i => new Instructor(i.id, i.name))

  displayStudents(students)
  displayCourses(courses)
  displayInstructors(instructors)
  displayRelationships(students, courses, instructors)
})
