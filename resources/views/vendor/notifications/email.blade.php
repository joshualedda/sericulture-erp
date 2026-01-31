<x-mail::message>
{{-- Custom Logo/Header --}}
<x-slot:header>
<x-mail::header :url="config('app.url')">
{{-- Pwedeng text lang or i-replace ng <img> tag --}}
<h1 style="color: #4f46e5; font-size: 24px; font-weight: 900; letter-spacing: -0.05em;">
    D’SERICORE-ERP
</h1>
</x-mail::header>
</x-slot:header>

{{-- Greeting --}}
<h2 style="color: #1e293b; font-size: 20px; font-weight: 800;">
@if (! empty($greeting))
{{ $greeting }}
@else
@lang('Hello!')
@endif
</h2>

{{-- Intro Lines --}}
@foreach ($introLines as $line)
<p style="color: #475569; line-height: 1.6;">{{ $line }}</p>
@endforeach

{{-- Action Button --}}
@isset($actionText)
<x-mail::button :url="$actionUrl" color="primary">
{{ $actionText }}
</x-mail::button>
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
<p style="color: #475569; line-height: 1.6;">{{ $line }}</p>
@endforeach

{{-- Salutation --}}
<p style="color: #1e293b; font-weight: 700;">
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('Best regards,')<br>
<span style="color: #4f46e5;">{{ config('app.name') }}</span>
@endif
</p>

{{-- Subcopy --}}
@isset($actionText)
<x-slot:subcopy>
<div style="font-size: 11px; color: #94a3b8;">
@lang("If you're having trouble clicking the \":actionText\" button, copy and paste the URL below into your web browser:", ['actionText' => $actionText])
<br>
<a href="{{ $actionUrl }}" style="color: #6366f1;">{{ $displayableActionUrl }}</a>
</div>
</x-slot:subcopy>
@endisset
</x-mail::message>