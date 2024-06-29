const hamburger = document.getElementById("hamburger");
        const navList = document.getElementById("navlist");

        hamburger.addEventListener("click", () => {
            navList.classList.toggle("show");
        });

        // Review form submission
        document.getElementById("review-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("reviewer-name").value;
            const reviewText = document.getElementById("review-text").value;
            
            if (name && reviewText) {
                const reviewContainer = document.createElement("div");
                reviewContainer.classList.add("review");
                
                const reviewerName = document.createElement("h4");
                reviewerName.textContent = name;
                
                const reviewParagraph = document.createElement("p");
                reviewParagraph.textContent = reviewText;
                
                reviewContainer.appendChild(reviewerName);
                reviewContainer.appendChild(reviewParagraph);
                
                document.getElementById("reviews-container").appendChild(reviewContainer);
                
                document.getElementById("review-form").reset();
            }});
            

        function hashPassword(password) {
            return btoa(password); // Base64 encoding as a simple hash (not secure for real-world use)
        }

        // Handle user registration
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user already exists
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                alert('User already registered.');
            } else {
                // Register new user
                const hashedPassword = hashPassword(password);
                users.push({ email, password: hashedPassword });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful.');
                document.getElementById('register-form').reset();
            }
        });

        // Handle user login
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const hashedPassword = hashPassword(password);

            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user exists and password matches
            const user = users.find(user => user.email === email && user.password === hashedPassword);
            if (user) {
                alert('Login successful.');
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                document.getElementById('logout-btn').style.display = 'block';
                document.getElementById('login-form').reset();
            } else {
                alert('Invalid email or password.');
            }
        });

        // Handle user logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            alert('Logged out successfully.');
            localStorage.removeItem('loggedInUser');
            document.getElementById('logout-btn').style.display = 'none';
        });

        // Check if a user is logged in on page load
        document.addEventListener('DOMContentLoaded', () => {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser) {
                document.getElementById('logout-btn').style.display = 'block';
            }
        });