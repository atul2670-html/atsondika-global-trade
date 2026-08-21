/**
 * Admin Access Security & State Handler
 */
export let isAdminLoggedIn = false;

export function verifyAdminAccess(actionCallback) {
  if (isAdminLoggedIn) {
    actionCallback();
    return;
  }
  const pin = prompt("🔐 Enter Admin Password (PIN) (e.g. 1234):");
  if (pin === '1234' || pin === 'admin123' || pin === '7861997755') {
    isAdminLoggedIn = true;
    updateAdminUIState();
    actionCallback();
  } else if (pin !== null) {
    alert("⚠️ Incorrect Password! Admin Access Only.");
  }
}

export function setAdminLoggedInState(status) {
  isAdminLoggedIn = status;
  updateAdminUIState();
}

export function updateAdminUIState() {
  const btn = document.getElementById('adminAuthBtn');
  if (btn && isAdminLoggedIn) {
    btn.innerHTML = '🔓 Admin Active';
    btn.style.background = 'rgba(34, 197, 94, 0.2)';
    btn.style.color = '#4ade80';
    btn.style.borderColor = '#22c55e';
  }
}
