// Global variables
let currentArray = [];
let animationDelay = 100;

// ==================== SORTING ALGORITHMS ====================

// Bubble Sort
function bubbleSort(arr) {
    const steps = [];
    let array = [...arr];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({
                array: [...array],
                comparing: [j, j + 1],
                sorted: []
            });

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }

    steps.push({
        array: [...array],
        comparing: [],
        sorted: Array.from({ length: n }, (_, i) => i)
    });

    return { steps, result: array };
}

// Selection Sort
function selectionSort(arr) {
    const steps = [];
    let array = [...arr];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        steps.push({
            array: [...array],
            comparing: [i],
            sorted: Array.from({ length: i }, (_, idx) => idx)
        });

        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            steps.push({
                array: [...array],
                comparing: [i, minIdx],
                sorted: Array.from({ length: i + 1 }, (_, idx) => idx)
            });
        }
    }

    steps.push({
        array: [...array],
        comparing: [],
        sorted: Array.from({ length: n }, (_, i) => i)
    });

    return { steps, result: array };
}

// Insertion Sort
function insertionSort(arr) {
    const steps = [];
    let array = [...arr];
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        steps.push({
            array: [...array],
            comparing: [i],
            sorted: Array.from({ length: i }, (_, idx) => idx)
        });

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            steps.push({
                array: [...array],
                comparing: [j + 1],
                sorted: Array.from({ length: i }, (_, idx) => idx)
            });
        }
        array[j + 1] = key;
    }

    steps.push({
        array: [...array],
        comparing: [],
        sorted: Array.from({ length: n }, (_, i) => i)
    });

    return { steps, result: array };
}

// Merge Sort
function mergeSort(arr) {
    const steps = [];
    let array = [...arr];

    function merge(left, mid, right) {
        let leftArr = array.slice(left, mid + 1);
        let rightArr = array.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                array[k++] = leftArr[i++];
            } else {
                array[k++] = rightArr[j++];
            }
            steps.push({
                array: [...array],
                comparing: [k - 1],
                sorted: []
            });
        }

        while (i < leftArr.length) {
            array[k++] = leftArr[i++];
            steps.push({
                array: [...array],
                comparing: [k - 1],
                sorted: []
            });
        }

        while (j < rightArr.length) {
            array[k++] = rightArr[j++];
            steps.push({
                array: [...array],
                comparing: [k - 1],
                sorted: []
            });
        }
    }

    function mergeSortHelper(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            mergeSortHelper(left, mid);
            mergeSortHelper(mid + 1, right);
            merge(left, mid, right);
        }
    }

    mergeSortHelper(0, array.length - 1);

    steps.push({
        array: [...array],
        comparing: [],
        sorted: Array.from({ length: array.length }, (_, i) => i)
    });

    return { steps, result: array };
}

// Quick Sort
function quickSort(arr) {
    const steps = [];
    let array = [...arr];

    function partition(low, high) {
        const pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({
                array: [...array],
                comparing: [j, high],
                sorted: []
            });

            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        return i + 1;
    }

    function quickSortHelper(low, high) {
        if (low < high) {
            const pi = partition(low, high);
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    }

    quickSortHelper(0, array.length - 1);

    steps.push({
        array: [...array],
        comparing: [],
        sorted: Array.from({ length: array.length }, (_, i) => i)
    });

    return { steps, result: array };
}

// ==================== SEARCHING ALGORITHMS ====================

// Linear Search
function linearSearch(arr, target) {
    const steps = [];

    for (let i = 0; i < arr.length; i++) {
        steps.push({
            array: arr,
            comparing: [i],
            found: -1,
            message: `Memeriksa indeks ${i}: ${arr[i]}`
        });

        if (arr[i] === target) {
            steps.push({
                array: arr,
                comparing: [i],
                found: i,
                message: `Ditemukan ${target} di indeks ${i}`
            });
            return { steps, result: i };
        }
    }

    steps.push({
        array: arr,
        comparing: [],
        found: -1,
        message: `${target} tidak ditemukan`
    });

    return { steps, result: -1 };
}

// Binary Search
function binarySearch(arr, target) {
    const steps = [];
    const sorted = [...arr].sort((a, b) => a - b);
    let left = 0, right = sorted.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        steps.push({
            array: sorted,
            comparing: [left, mid, right],
            found: -1,
            message: `Cek tengah (${mid}): nilai = ${sorted[mid]}`
        });

        if (sorted[mid] === target) {
            steps.push({
                array: sorted,
                comparing: [mid],
                found: mid,
                message: `Ditemukan ${target} di indeks ${mid}`
            });
            return { steps, result: mid };
        } else if (sorted[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    steps.push({
        array: sorted,
        comparing: [],
        found: -1,
        message: `${target} tidak ditemukan`
    });

    return { steps, result: -1 };
}

// Interpolation Search
function interpolationSearch(arr, target) {
    const steps = [];
    const sorted = [...arr].sort((a, b) => a - b);
    let left = 0, right = sorted.length - 1;

    while (left <= right && target >= sorted[left] && target <= sorted[right]) {
        const pos = left + Math.floor(
            ((target - sorted[left]) / (sorted[right] - sorted[left])) *
            (right - left)
        );

        steps.push({
            array: sorted,
            comparing: [pos],
            found: -1,
            message: `Interpolasi ke posisi ${pos}: nilai = ${sorted[pos]}`
        });

        if (sorted[pos] === target) {
            steps.push({
                array: sorted,
                comparing: [pos],
                found: pos,
                message: `Ditemukan ${target} di indeks ${pos}`
            });
            return { steps, result: pos };
        } else if (sorted[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }

    steps.push({
        array: sorted,
        comparing: [],
        found: -1,
        message: `${target} tidak ditemukan`
    });

    return { steps, result: -1 };
}

// Jump Search
function jumpSearch(arr, target) {
    const steps = [];
    const sorted = [...arr].sort((a, b) => a - b);
    const n = sorted.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;

    // Find the block where element is present
    while (sorted[Math.min(step, n) - 1] < target) {
        steps.push({
            array: sorted,
            comparing: [Math.min(step, n) - 1],
            found: -1,
            message: `Melompat ke indeks ${Math.min(step, n) - 1}`
        });
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            steps.push({
                array: sorted,
                comparing: [],
                found: -1,
                message: `${target} tidak ditemukan`
            });
            return { steps, result: -1 };
        }
    }

    // Linear search in the identified block
    while (sorted[prev] < target) {
        steps.push({
            array: sorted,
            comparing: [prev],
            found: -1,
            message: `Linear search di indeks ${prev}`
        });
        prev++;
        if (prev === Math.min(step, n)) {
            steps.push({
                array: sorted,
                comparing: [],
                found: -1,
                message: `${target} tidak ditemukan`
            });
            return { steps, result: -1 };
        }
    }

    // Check if element is found
    if (sorted[prev] === target) {
        steps.push({
            array: sorted,
            comparing: [prev],
            found: prev,
            message: `Ditemukan ${target} di indeks ${prev}`
        });
        return { steps, result: prev };
    }

    steps.push({
        array: sorted,
        comparing: [],
        found: -1,
        message: `${target} tidak ditemukan`
    });

    return { steps, result: -1 };
}

// Exponential Search
function exponentialSearch(arr, target) {
    const steps = [];
    const sorted = [...arr].sort((a, b) => a - b);
    const n = sorted.length;

    if (sorted[0] === target) {
        steps.push({
            array: sorted,
            comparing: [0],
            found: 0,
            message: `Ditemukan ${target} di indeks 0`
        });
        return { steps, result: 0 };
    }

    let i = 1;
    while (i < n && sorted[i] < target) {
        steps.push({
            array: sorted,
            comparing: [i],
            found: -1,
            message: `Eksponensial: cek indeks ${i}`
        });
        i *= 2;
    }

    // Binary search on the found range
    const left = Math.floor(i / 2);
    const right = Math.min(i, n - 1);

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        steps.push({
            array: sorted,
            comparing: [mid],
            found: -1,
            message: `Binary search di indeks ${mid}`
        });

        if (sorted[mid] === target) {
            steps.push({
                array: sorted,
                comparing: [mid],
                found: mid,
                message: `Ditemukan ${target} di indeks ${mid}`
            });
            return { steps, result: mid };
        } else if (sorted[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    steps.push({
        array: sorted,
        comparing: [],
        found: -1,
        message: `${target} tidak ditemukan`
    });

    return { steps, result: -1 };
}

// ==================== UI FUNCTIONS ====================

// Generate random array
function generateArray() {
    const size = parseInt(document.getElementById('arraySize').value) || 10;
    currentArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    visualizeArray(currentArray, [], []);
    document.getElementById('resultBox').innerHTML = '<p>Array telah dibuat: ' + currentArray.join(', ') + '</p>';
}

// Visualize array
function visualizeArray(array, comparing = [], sorted = []) {
    const viz = document.getElementById('arrayViz');
    viz.innerHTML = '';

    const maxVal = Math.max(...array);
    const baseHeight = 80;

    array.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        const height = (val / maxVal) * baseHeight;
        bar.style.height = height + 'px';
        bar.textContent = val;

        if (sorted.includes(idx)) {
            bar.classList.add('highlight');
        } else if (comparing.includes(idx)) {
            bar.style.background = '#f97316';
        }

        viz.appendChild(bar);
    });
}

// Animate sorting
async function animateSort(steps) {
    for (let step of steps) {
        visualizeArray(step.array, step.comparing, step.sorted);
        await new Promise(resolve => setTimeout(resolve, animationDelay));
    }
}

// Animate searching
async function animateSearch(steps) {
    for (let step of steps) {
        visualizeArray(step.array, step.comparing, []);
        document.getElementById('resultBox').innerHTML = '<p>' + step.message + '</p>';
        await new Promise(resolve => setTimeout(resolve, animationDelay * 2));
    }
}

// Run sort demo
function runSort(algorithm) {
    if (currentArray.length === 0) {
        generateArray();
    }

    let result;
    switch (algorithm) {
        case 'bubble':
            result = bubbleSort(currentArray);
            break;
        case 'selection':
            result = selectionSort(currentArray);
            break;
        case 'insertion':
            result = insertionSort(currentArray);
            break;
        case 'merge':
            result = mergeSort(currentArray);
            break;
        case 'quick':
            result = quickSort(currentArray);
            break;
        default:
            return;
    }

    document.getElementById('resultBox').innerHTML = '<p>Sorting berjalan...</p>';
    animateSort(result.steps).then(() => {
        currentArray = result.result;
        document.getElementById('resultBox').innerHTML =
            '<p>✅ Sorting selesai!<br>Hasil: ' + result.result.join(', ') + '</p>';
    });
}

// Run search demo
function runSearch(algorithm) {
    if (currentArray.length === 0) {
        generateArray();
    }

    let result;
    switch (algorithm) {
        case 'linear':
            result = linearSearch(currentArray, 50);
            break;
        case 'binary':
            result = binarySearch(currentArray, 50);
            break;
        case 'interpolation':
            result = interpolationSearch(currentArray, 50);
            break;
        case 'jump':
            result = jumpSearch(currentArray, 50);
            break;
        case 'exponential':
            result = exponentialSearch(currentArray, 50);
            break;
        default:
            return;
    }

    document.getElementById('resultBox').innerHTML = '<p>Searching berjalan...</p>';
    animateSearch(result.steps).then(() => {
        if (result.result !== -1) {
            document.getElementById('resultBox').innerHTML =
                '<p>✅ Ditemukan di indeks: ' + result.result + '</p>';
        } else {
            document.getElementById('resultBox').innerHTML =
                '<p>❌ Nilai tidak ditemukan</p>';
        }
    });
}

// Demonstrate sort
function demonstrateSort() {
    if (currentArray.length === 0) {
        generateArray();
    }
    runSort('bubble'); // Default to bubble sort
}

// Demonstrate search
function demonstrateSearch() {
    if (currentArray.length === 0) {
        generateArray();
    }

    const searchValue = parseInt(document.getElementById('searchValue').value);
    if (isNaN(searchValue)) {
        alert('Masukkan nilai yang valid untuk dicari');
        return;
    }

    if (currentArray.length === 0) {
        generateArray();
    }

    let result = linearSearch(currentArray, searchValue);

    document.getElementById('resultBox').innerHTML = '<p>Searching berjalan...</p>';
    animateSearch(result.steps).then(() => {
        if (result.result !== -1) {
            document.getElementById('resultBox').innerHTML =
                '<p>✅ Ditemukan di indeks: ' + result.result + '</p>';
        } else {
            document.getElementById('resultBox').innerHTML =
                '<p>❌ Nilai tidak ditemukan</p>';
        }
    });
}

// Reset demo
function resetDemo() {
    currentArray = [];
    document.getElementById('arrayViz').innerHTML = '';
    document.getElementById('resultBox').innerHTML = '<p>Klik tombol untuk memulai demonstrasi...</p>';
    document.getElementById('arraySize').value = '10';
    document.getElementById('searchValue').value = '';
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    generateArray();
});
