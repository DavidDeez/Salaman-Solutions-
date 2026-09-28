// script.js

// Function to calculate wealth based on inputs
function calculateWealth() {
    // Get values from the form
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value) || 0;
    const years = parseFloat(document.getElementById('years').value) || 0;
    const annualInterestRate = parseFloat(document.getElementById('interest-rate').value) || 0;

    // Convert annual interest rate to monthly and decimal
    const monthlyRate = (annualInterestRate / 100) / 12;
    const months = years * 12;

    let futureValue = 0;

    if (monthlyRate === 0) {
        futureValue = initialInvestment + (monthlyContribution * months);
    } else {
        // Compound interest for initial investment
        const futureValueOfInitial = initialInvestment * Math.pow(1 + monthlyRate, months);
        
        // Future value of an annuity (monthly contributions)
        const futureValueOfContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        
        futureValue = futureValueOfInitial + futureValueOfContributions;
    }

    // Format the result as Nigerian Naira currency
    const formattedResult = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(futureValue);

    // Display the result
    const resultElement = document.getElementById('calc-result');
    const resultAmount = document.getElementById('result-amount');
    
    resultAmount.textContent = formattedResult;
    resultElement.classList.remove('hidden');
}

// Simple smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const navMenu = document.querySelector('nav ul');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
