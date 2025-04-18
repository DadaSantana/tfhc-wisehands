import axios from 'axios';
import qs from 'qs';

class POEditorBackend {
    constructor(services, options = {}) {
        this.init(services, options);
    }

    init(services, options = {}) {
        this.services = services;
        this.options = options;
    }

    read(language, namespace, callback) {
        console.log('read language:', language)
        const url = `https://api.poeditor.com/v2/projects/export`;
        const requestBody = qs.stringify({
            api_token: this.options.apiKey,
            id: this.options.projectId,
            language: language,
            type: 'i18next',
        });

        axios.post(url, requestBody, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then(response => {
                const { data } = response;
                if (data.response.status === 'success') {
                    // console.log('data.result.url:', data.result.url)
                    const fileUrl = data.result.url;
                    axios.get(fileUrl).then(response => {
                        // console.log('response.data:', response.data)
                        callback(null, response.data.translations);
                    });
                    // callback(null, data.result.url); // Suponha que a URL contém o JSON real
                    // Aqui você pode adicionar um passo para baixar o JSON da URL
                } else {
                    callback('failed to load', null);
                }
            })
            .catch(error => {
                callback(error, null);
            });
    }
}

POEditorBackend.type = 'backend';
export default POEditorBackend;
