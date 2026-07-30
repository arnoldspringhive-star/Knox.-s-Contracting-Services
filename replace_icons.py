import re

files = [
    'architectural-drawings.html',
    'project-management.html',
    'property-management.html',
    'renovation.html',
    'ddot-permitting.html'
]

mapping = {
    'Conceptual Design': 'icon_arch_conceptual.png',
    'Blueprint Drafting': 'icon_arch_blueprint.png',
    'Code Compliance': 'icon_arch_code.png',
    'Space Planning': 'icon_arch_space.png',
    'Team Collaboration': 'icon_arch_team.png',
    'Sustainable Design': 'icon_arch_eco.png',
    'Timeline Tracking': 'icon_pm_timeline.png',
    'Budget Management': 'icon_pm_budget.png',
    'On-Site Supervision': 'icon_pm_supervision.png',
    'Client Reporting': 'icon_pm_reporting.png',
    'Seamless Coordination': 'icon_pm_coordination.png',
    'Risk Mitigation': 'icon_pm_risk.png',
    '24/7 Maintenance': 'icon_prop_maintenance.png',
    'Vendor Management': 'icon_prop_vendor.png',
    'Financial Reporting': 'icon_prop_finance.png',
    'Property Inspections': 'icon_prop_inspection.png',
    'Value Optimization': 'icon_prop_value.png',
    'Structural Modifications': 'icon_reno_structural.png',
    'Luxury Remodeling': 'icon_reno_luxury.png',
    'Commercial Fit-Outs': 'icon_reno_commercial.png',
    'Historic Preservation': 'icon_historic_gold.png',
    'Premium Finishes': 'icon_reno_finishes.png',
    'Smart Home Integration': 'icon_reno_smart.png',
    'DDOT Expediting': 'icon_submission_gold.png',
    'Traffic Control (TCP)': 'icon_ddot_traffic.png',
    'BZA Preparation': 'icon_ddot_bza.png',
    'Public Hearings': 'icon_ddot_hearing.png',
    'Variance Filings': 'icon_ddot_variance.png',
    'Utility Coordination': 'icon_ddot_utility.png'
}

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    def replacer(match):
        i_tag = match.group(1)
        whitespace = match.group(2)
        h3_tag = match.group(3)
        title = match.group(4)
        
        if title in mapping:
            img_tag = f'<img src="images/{mapping[title]}" alt="{title} Icon">'
            return img_tag + whitespace + h3_tag
        return match.group(0)

    pattern = re.compile(r'(<i\s+class="[^"]+"\s*></i>)(\s*)(<h3>(.*?)</h3>)')
    new_content = pattern.sub(replacer, content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
print("Done!")
