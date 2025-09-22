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
    li.innerHTML = `<strong>${s.name} (${s.age})</strong> - ${s.course}`
    if (s.age > 21) {
      li.classList.add('over21')
      li.innerHTML += ' *'
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
    li.innerHTML = `<strong>${c.title}</strong>: ${c.description}`
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
    li.textContent = `${i.name} - ${i.subject}`
    ul.appendChild(li)
  })
  div.innerHTML = '<h2>Instructors</h2>'
  div.appendChild(ul)
}

loadData().then(data => {
  displayStudents(data.students)
  displayCourses(data.courses)
  displayInstructors(data.instructors)
})