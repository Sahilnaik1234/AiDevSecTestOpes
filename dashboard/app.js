document.addEventListener('DOMContentLoaded', () => {
    if (!window.VULN_DATA) {
        console.error('No vulnerability data found');
        return;
    }

    const data = window.VULN_DATA;
    renderDashboard(data);
});

function renderDashboard(data) {
    // Update Stats
    document.getElementById('stat-secrets').textContent = data.secrets.length;
    document.getElementById('stat-sast').textContent = data.sast.length;
    document.getElementById('stat-deps').textContent = data.dependencies.length;

    const totalIssues = data.secrets.length + data.sast.length + data.dependencies.length;
    const statusBadge = document.getElementById('overall-status');

    if (totalIssues === 0) {
        statusBadge.textContent = 'System Secure';
        statusBadge.className = 'status-badge status-success';
    }

    document.getElementById('scan-time').textContent = `Last scan completed: ${new Date().toLocaleString()}`;

    // Render Secrets
    const secretsList = document.getElementById('secrets-list');
    if (data.secrets.length === 0) {
        secretsList.innerHTML = '<div class="vuln-item" style="grid-template-columns: 1fr; text-align: center; color: var(--text-muted)">No secrets detected</div>';
    } else {
        data.secrets.forEach(s => {
            const item = createVulnItem('CRITICAL', s.Description, s.File, s.StartLine);
            secretsList.appendChild(item);
        });
    }

    // Render SAST
    const sastList = document.getElementById('sast-list');
    if (data.sast.length === 0) {
        sastList.innerHTML = '<div class="vuln-item" style="grid-template-columns: 1fr; text-align: center; color: var(--text-muted)">No SAST violations found</div>';
    } else {
        data.sast.forEach(v => {
            const item = createVulnItem('HIGH', v.extra.message, v.path, v.start.line);
            sastList.appendChild(item);
        });
    }

    // Render Dependencies
    const depsList = document.getElementById('deps-list');
    if (data.dependencies.length === 0) {
        depsList.innerHTML = '<div class="vuln-item" style="grid-template-columns: 1fr; text-align: center; color: var(--text-muted)">No vulnerable dependencies</div>';
    } else {
        data.dependencies.forEach(d => {
            d.Vulnerabilities?.forEach(v => {
                const item = createVulnItem(
                    v.Severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
                    `${v.VulnerabilityID} in ${v.PkgName}`,
                    d.Target,
                    '-'
                );
                depsList.appendChild(item);
            });
        });
    }
}

function createVulnItem(sev, title, file, line) {
    const div = document.createElement('div');
    div.className = 'vuln-item';

    const sevClass = `sev-${sev.toLowerCase()}`;

    div.innerHTML = `
        <div class="severity ${sevClass}">${sev}</div>
        <div class="vuln-info">
            <div class="vuln-desc">${title}</div>
            <div class="file-path">${file} ${line !== '-' ? ` : Line ${line}` : ''}</div>
        </div>
        <div style="text-align: right">
            <button class="status-badge" style="cursor: pointer; background: rgba(255,255,255,0.05); color: var(--text-main); border: 1px solid var(--glass-border)">Ignore</button>
        </div>
    `;
    return div;
}
