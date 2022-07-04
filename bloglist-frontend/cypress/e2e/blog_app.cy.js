describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/reset', {})
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'usman',
      username: 'codegeek01',
      password: 'secret'
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'imam',
      username: 'codegeek02',
      password: 'secret'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  it('Login is successful with right credentials', function() {
    cy.get('#username').type('codegeek01')
    cy.get('#password').type('secret')
    cy.get('#login-submit').click()

    cy.contains('usman is logged in')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('codegeek01')
    cy.get('#password').type('wrong')
    cy.get('#login-submit').click()

    cy.contains('wrong username or password')
    cy.get('.error').should('have.css', 'color', 'rgb(31, 16, 16)')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('codegeek01')
      cy.get('#password').type('secret')
      cy.get('#login-submit').click()
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('blog by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://cypressblog.com')
      cy.get('#addblog').click()
      cy.contains('a new blog blog by cypress has been added')
      cy.contains('blog by cypress cypress')
    })

    describe('when a user is logged in and blog is created', function() {
      beforeEach(function() {
        cy.contains('new note').click()
        cy.get('#title').type('blog by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('http://cypressblog.com')
        cy.get('#addblog').click()
        cy.contains('a new blog blog by cypress has been added')
        cy.contains('blog by cypress cypress')
      })
      it('users can like a blog', function() {
        cy.contains('view').click()
        cy.contains('Like').click()
        cy.contains('likes: 1')
      })
      it('blog owners can delete a blog', function() {
        cy.contains('view').click()
        cy.contains('delete').click()
      })
    })


  })
  describe('Blogs ordered by number of likes', function() {
    beforeEach(function() {
      cy.login({ username: 'codegeek01', password: 'secret' })
      cy.createBlog({ author: 'John Doe', title: 'test1', url: 'http://example.com./test1' })
      cy.createBlog({ author: 'John Doe', title: 'test2', url: 'http://example.com./test2' })
      cy.createBlog({ author: 'Jane Doe', title: 'test3', url: 'http://example.com./test3' })

      cy.contains('test1').parent().as('blog1')
      cy.contains('test2').parent().as('blog2')
      cy.contains('test3').parent().as('blog3')
    })

    it.only('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('Like').as('like1')
      cy.get('@blog2').contains('Like').as('like2')
      cy.get('@blog3').contains('Like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})
