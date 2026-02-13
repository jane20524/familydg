$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$filePath = Join-Path $env:USERPROFILE '.claude\projects\c--Users------familydg\7f488c8f-af57-4cd8-b9a3-8d7508b21442\subagents\agent-acompact-52fbd0.jsonl'
$content = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)

Write-Host "Total lines: $($content.Count)"
for ($idx = 0; $idx -lt $content.Count; $idx++) {
    Write-Host "Line $($idx+1): length=$($content[$idx].Length)"
}

# Check lines 5 and 7 for hong case 3 context
foreach ($lineIdx in @(4, 6)) {
    $line = $content[$lineIdx]
    $searchStr = 'hong case 3'
    $found = $line.IndexOf($searchStr)
    if ($found -ge 0) {
        $start = [Math]::Max(0, $found - 1000)
        $end = [Math]::Min($line.Length, $found + 3000)
        Write-Host "`n=== Line $($lineIdx+1) context around 'hong case 3' ==="
        Write-Host $line.Substring($start, $end - $start)
        Write-Host "=== END ==="
    }
}
