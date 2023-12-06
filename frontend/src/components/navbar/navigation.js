export const publicRoutes = [
  { name: "Login", href: "/login", current: false },
  { name: "Register", href: "/register", current: false },
];

export const patientRoutes = [
  { name: "Home", href: "/", current: true },
  { name: "Profile", href: "/profile", current: false }
];

export const doctorRoutes = [
  { name: "Home", href: "/dashboard", current: false},
  { name: "Profile", href: "/profile", current: false },
  { name: "Create Record", href: "/createRecord", current: false },
  { name: "Register Patient", href: "/registerPatient", current: false },
]
