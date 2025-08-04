@for ($i = 0; $i < $users->count(); $i++)
    @php
        $backgroundColor = $i % 2 == 0 ? '#dee6ef' : '#ffd7d7';
    @endphp
    <table style="background: {{ $backgroundColor }}">
        <thead>
            <tr>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">RT</th>
                <th colspan="9" style="background: {{ $backgroundColor }}; font-weight: bold">
                    {{ $users[$i]->tenant?->number }}</th>
            </tr>
            <tr>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">No KK</th>
                <th colspan="9" style="background: {{ $backgroundColor }}; font-weight: bold">
                    {{ $users[$i]->detail?->no_kk }}</th>
            </tr>
            <tr>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Alamat</th>
                <th colspan="9" style="background: {{ $backgroundColor }}; font-weight: bold">
                    {{ $users[$i]->detail?->address }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Nama</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">NIK</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Jenis Kelamin</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Tempat Lahir</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Tanggal Lahir</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Agama</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Pendidikan</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Pekerjaan</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">No. Telepon</th>
                <th style="background: {{ $backgroundColor }}; font-weight: bold">Status Pernikahan</th>
            </tr>
            <tr>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->name }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->no_ktp }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->gender }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->birth_place }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->birth_date }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->religion }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->education }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->job }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->phone }}</td>
                <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->marital_status }}</td>
            </tr>
            @foreach ($users[$i]->childs as $user)
                <tr>
                    <td style="background: {{ $backgroundColor }}">{{ $user->name }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $user->detail?->no_ktp }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $user->detail?->gender }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $user->detail?->birth_place }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $user->detail?->birth_date }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $user->detail?->religion }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $user->detail?->education }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $user->detail?->job }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->phone }}</td>
                    <td style="background: {{ $backgroundColor }}">{{ $users[$i]->detail?->marital_status }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endfor
