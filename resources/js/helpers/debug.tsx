/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function dd(data: any) {
    let output;
    try {
        output = JSON.stringify(data, null, 2);
    } catch (e: any) {
        output = String(data); // fallback
    }
    return <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#f6f8fa', padding: '1rem' }}>{output}</pre>;
}
